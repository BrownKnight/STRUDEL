<template>
  <div id="entity-management">
    <b-input-group size="sm" style="justify-content:stretch" class="mb-2">
      <b-form-spinbutton
        id="week-selection"
        v-model="weekSelection"
        :formatter-fn="weekSelectionFormatter"
        min="-7"
        max="1"
        size="sm"
        name="week-selection"
        class="flex-grow-1"
      ></b-form-spinbutton>
    </b-input-group>

    <b-button
      v-if="(entityList == null || entityList.length === 0) && weekSelection >= 0"
      variant="outline-success"
      size="lg"
      @click="generateThisWeeksPredictionsForUser()"
      >Predict This Weeks Fixtures</b-button
    >

    <b-alert :show="(entityList == null || entityList.length === 0) && weekSelection < 0" variant="warning">
      <span>
        <b-icon icon="exclamation-circle" class="align-top mr-1" font-scale="1.2" />
        No Predictions found for this week
      </span>
    </b-alert>

    <template v-for="date in Object.keys(entityList).sort()">
      <b-row :key="entityList[date][0].id" class="mt-4 ml-0">
        <h4>{{ prettyFormatDate(entityList[date][0].fixture.date) }}</h4>
      </b-row>
      <b-row :key="entityList[date][0].id + 1" class="mt-1">
        <b-container>
          <b-card-group
            columns
            :deck="entityList[date].length < 5"
            v-if="entityList != null && entityList[date] && entityList[date].length > 0"
          >
            <b-card
              v-for="entity in entityList[date]"
              :key="entity.id"
              no-body
              class="shadow"
              :border-variant="
                entity.fixture.fixtureResult
                  ? entity.fixture.fixtureResult === entity.prediction
                    ? 'success'
                    : 'danger'
                  : null
              "
            >
              <b-card-body class="px-3 pt-3 pb-2">
                <b-form-radio-group
                  buttons
                  v-model="entity.prediction"
                  button-variant="prediction"
                  class="d-flex flex-wrap justify-content-around"
                  :disabled="entity.fixture.fixtureResult !== null"
                >
                  <b-form-radio
                    name="prediction"
                    value="H"
                    class="w-50 d-flex flex-column align-items-center p-2 rounded justify-content-between"
                  >
                    <img :src="entity.fixture.homeTeam.teamLogoUrl" style="height: 5em; width: 5em;" />
                    <span class="mt-2 mb-1">{{ entity.fixture.homeTeam.teamName }}</span>
                    <small class="mb-2">Home</small>
                  </b-form-radio>
                  <b-form-radio
                    name="prediction"
                    value="A"
                    class="w-50 d-flex flex-column align-items-center p-2 rounded justify-content-between"
                  >
                    <img :src="entity.fixture.awayTeam.teamLogoUrl" style="height: 5em; width: 5em;" />
                    <span class="mt-2 mb-1">{{ entity.fixture.awayTeam.teamName }}</span>
                    <small class="mb-2">Away</small>
                  </b-form-radio>
                  <b-form-radio name="prediction" value="D" class="flex-grow-0 d-flex rounded">
                    <small class="my-1 mx-5">Draw</small>
                  </b-form-radio>
                </b-form-radio-group>
              </b-card-body>

              <b-card-body v-if="entity.fixture.fixtureResult !== null">
                <span>Actual Result: {{ formatFixtureResult(entity.fixture.fixtureResult) }}</span>
              </b-card-body>

              <b-button
                class="w-100 p-1"
                variant="outline-success"
                v-if="entity.previousPrediction !== entity.prediction"
                @click="submitPrediction(entity)"
              >
                <small>Submit Prediction</small>
              </b-button>
              <div class="w-100 p-1" variant="outline-secondary" disabled v-if="entity.prediction == null">
                <small class="helper-text"><em>Tap on a team to make your prediction</em></small>
              </div>
            </b-card>
          </b-card-group>
        </b-container>
      </b-row>
    </template>
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component, Watch } from "vue-property-decorator";
import { BaseComponent } from "@/components/BaseComponent.ts";
import moment from "moment";
import _ from "lodash";

@Component({
  components: {}
})
export default class PredictionEntry extends BaseComponent {
  startDate = moment()
    .startOf("week")
    .format("YYYY-MM-DD");
  endDate = moment(this.startDate)
    .add(1, "week")
    .format("YYYY-MM-DD");

  get apiEndpoint() {
    return `/iapi/predictions/bydate?startDate=${this.startDate}&endDate=${this.endDate}&user=${this.$store.state.AuthModule.user.id}`;
  }

  entityList: unknown = [];

  predictionChanges = true;

  weekSelection = 0;
  weekSelectionFormats = ["Last Week", "This Week", "Next Week"];
  weekSelectionFormatter(value: number) {
    const index = value + 1;
    if (index >= 0) {
      return this.weekSelectionFormats[index];
    } else {
      return `${this.prettyFormatDate(this.startDate)} - ${this.prettyFormatDate(this.endDate)}`;
    }
  }

  created() {
    this.getAllEntities();
  }

  @Watch("weekSelection")
  setWeekSelection(weekNumber: number) {
    this.startDate = moment()
      .startOf("week")
      .add(weekNumber, "week")
      .format("YYYY-MM-DD");

    this.endDate = moment(this.startDate)
      .add(1, "week")
      .format("YYYY-MM-DD");
  }

  @Watch("apiEndpoint")
  apiEndpointUpdated() {
    this.getAllEntities();
  }

  async getAllEntities() {
    if (!this.startDate || !this.endDate) {
      return;
    }

    return await this.callENKEL(this.apiEndpoint)
      .then(res => res.json())
      .then(json => {
        if (json == null || json.length == 0) {
          this.entityList = [];
          return;
        }

        json.forEach((element: { previousPrediction: string; prediction: string }) => {
          element.previousPrediction = element.prediction;
        });
        this.entityList = _.groupBy(json, "fixture.date");
      });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  submitPrediction(entity: any) {
    this.callENKEL("/iapi/predictions", "PUT", JSON.stringify(entity)).then(res => {
      if (res.ok) {
        this.showMessage({ message: "Prediction Submitted", variant: "success" });
        entity.previousPrediction = entity.prediction;
      } else {
        this.showMessage({ message: `Error occurred submitting prediction :( [${res.status}]`, variant: "danger" });
      }
    });
  }

  generateThisWeeksPredictionsForUser() {
    const startDate = moment()
      .startOf("week")
      .add(3, "day");
    const endDate = moment(this.startDate).add(1, "week");

    this.callENKEL(
      `/iapi/predictions/${this.$store.state.AuthModule.user.id}/generate?startDate=${startDate.format(
        "YYYY-MM-DD"
      )}&endDate=${endDate.format("YYYY-MM-DD")}`,
      "POST"
    ).then(res => {
      if (res.status !== 200 && res.status !== 400) {
        this.showMessage({
          message: `Could not generate this weeks predictions (${res.status})`,
          variant: "danger",
          delay: 10000
        });
        return;
      }

      res
        .text()
        .then(text => JSON.parse(text))
        .then(json => {
          if (!json.success) {
            this.showMessage({
              message: `Could not generate predictions. API Response: ${json.errorMessage}`,
              variant: "danger"
            });
            return;
          }

          if (json.success) {
            this.showMessage({
              message: "Predictions Generated",
              variant: "success"
            });
            this.getAllEntities();
            return;
          }
        });
    });
  }

  showMessage({ message, variant, delay }: { message: string; variant?: string; delay?: number }) {
    this.$bvToast.toast(message, {
      noCloseButton: true,
      variant: variant,
      autoHideDelay: delay ?? 3000,
      toaster: "b-toaster-top-right",
      href: "#"
    });
  }
}
</script>

<style lang="scss">
@use "sass:map";

.btn-prediction {
  border-color: transparent;
  // border-radius: 1em !important;
  border-width: 2px;
}

.btn-prediction.disabled {
  opacity: 0.8;
}

.btn-prediction.active {
  background-color: whitesmoke;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}
.btn-prediction:hover:not(.disabled) {
  background-color: whitesmoke;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}

.helper-text {
  font-weight: bold;
  color: darkgrey;
}
</style>
