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

    <transition-group name="slide-down" mode="out-in">
      <template v-for="date in Object.keys(entityList).sort()">
        <div :key="entityList[date][0].id + 4">
          <b-row :key="entityList[date][0].id" class="mt-4 ml-0 align-items-start">
            <h4>{{ prettyFormatDate(entityList[date][0].fixture.date) }}</h4>
            <transition name="zoom-in" mode="out-in">
              <b-button
                class="ml-auto mr-3"
                variant="success"
                size="sm"
                v-if="anyPredictionsChanged(entityList[date])"
                @click="submitAllPredictions(entityList[date])"
                >Submit All</b-button
              >
            </transition>
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
                  <b-card-body class="p-0 pr-2 text-right helper-text border-0">
                    <small>
                      {{ prettyFormatTime(entity.fixture.time) }}
                    </small>
                  </b-card-body>
                  <b-card-body class="px-3 pt-0 pb-2">
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
                        class="w-45 flex-grow-0 d-flex flex-column align-items-center p-2 rounded justify-content-between"
                      >
                        <img :src="entity.fixture.homeTeam.teamLogoUrl" style="height: 5em; width: 5em;" />
                        <span class="mt-2 mb-1">{{ entity.fixture.homeTeam.teamName }}</span>
                        <small>Home</small>
                      </b-form-radio>
                      <b-form-radio
                        name="prediction"
                        value="A"
                        class="w-45 flex-grow-0 d-flex flex-column align-items-center p-2 rounded justify-content-between"
                      >
                        <img :src="entity.fixture.awayTeam.teamLogoUrl" style="height: 5em; width: 5em;" />
                        <span class="mt-2 mb-1">{{ entity.fixture.awayTeam.teamName }}</span>
                        <small>Away</small>
                      </b-form-radio>
                      <b-form-radio name="prediction" value="D" class="flex-grow-1 w-100 d-flex rounded mt-2">
                        <small class="mx-auto">Draw</small>
                      </b-form-radio>
                    </b-form-radio-group>
                  </b-card-body>

                  <b-card-body v-if="entity.fixture.fixtureResult !== null">
                    <span>Actual Result: {{ formatFixtureResult(entity.fixture.fixtureResult) }}</span>
                  </b-card-body>

                  <transition name="zoom-in" mode="out-in">
                    <b-button
                      class="w-100 p-1 submit-button"
                      variant="success"
                      v-if="entity.previousPrediction !== entity.prediction"
                      @click="submitPrediction(entity)"
                      key="submit"
                    >
                      <small>Submit Prediction</small>
                    </b-button>
                    <div class="w-100 p-1 helper-text" v-else-if="entity.prediction == null" key="helper">
                      <small><em>Tap on a team to make your prediction</em></small>
                    </div>
                    <div class="w-100 p-1 helper-text" v-else key="my-prediction">
                      <small>
                        <em>
                          My Prediction: <b>{{ formatFixtureResult(entity.prediction) }}</b>
                        </em>
                      </small>
                    </div>
                  </transition>
                </b-card>
              </b-card-group>
            </b-container>
          </b-row>
        </div>
      </template>
    </transition-group>
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component, Watch } from "vue-property-decorator";
import { BaseComponent } from "@/components/BaseComponent.ts";
import moment from "moment";
import _, { Dictionary } from "lodash";
import { Prediction } from "@/ENKEL/entity/Prediction";
import { FixtureResult } from "@/ENKEL/entity/dataTypes/FixtureResult";

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

  entityList: Dictionary<unknown[]> | [] = [];

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

  submitPrediction(entity: Prediction & { previousPrediction: FixtureResult }) {
    this.callENKEL("/iapi/predictions", "PUT", JSON.stringify(entity)).then(res => {
      if (res.ok) {
        this.showMessage({ message: "Prediction Submitted", variant: "success" });
        entity.previousPrediction = entity.prediction;
      } else {
        this.showMessage({ message: `Error occurred submitting prediction :( [${res.status}]`, variant: "danger" });
      }
    });
  }

  submitAllPredictions(entities: Array<Prediction & { previousPrediction: FixtureResult }>) {
    entities.forEach(entity => {
      if (entity.prediction !== entity.previousPrediction) {
        this.submitPrediction(entity);
      }
    });
  }

  generateThisWeeksPredictionsForUser() {
    this.callENKEL(
      `/iapi/predictions/${this.$store.state.AuthModule.user.id}/generate?startDate=${this.startDate}&endDate=${this.endDate}`,
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

  anyPredictionsChanged(entities: Array<Prediction & { previousPrediction: string }>) {
    return _.some(entities, entity => entity.previousPrediction !== entity.prediction);
  }
}
</script>

<style lang="scss">
@use "sass:map";

.btn-prediction {
  border-color: transparent;
  // border-radius: 1em !important;
  border-width: 1px;
  color: #757674;
}

// .btn-prediction:first-child {
//   border-bottom-color: black !important;
// }

.btn-prediction.disabled {
  opacity: 1;
}

.btn-prediction.active {
  background-color: #f7f7f6;
  border-color: rgba(23, 22, 31, 0.2);
  border-width: 1px;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.125) !important;
  color: black;
}
.btn-prediction:hover:not(.disabled) {
  background-color: #f7f7f6;
  border-width: 1px;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.125) !important;
}

.helper-text {
  font-weight: bold;
  color: darkgrey;
  border: 1px solid transparent;
}

.submit-button {
  border-top-right-radius: 0;
  border-top-left-radius: 0;
}

// Transitions for submit/helper-text
.zoom-in-enter-active {
  transition: all 0.2s ease;
}
.zoom-in-leave-active {
  transition: all 0.3s ease;
}
.zoom-in-enter {
  transform: scale(1.1);
  opacity: 0;
}
.zoom-in-leave-to {
  transform: scale(0.2);
  opacity: 0;
}

// Transitions for whole page slide
.slide-down-enter-active {
  transition: all 0.7s ease;
  transition-delay: 0.7s;
}
.slide-down-leave-active {
  transition: all 0.7s ease;
}
.slide-down-enter {
  transform: translateY(-100px);
  opacity: 0;
}
.slide-down-leave-to {
  transform: translateY(100px);
  opacity: 0;
}

.w-45 {
  width: 45%;
}
</style>
