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
        <div :key="entityList[date][0].id">
          <b-row class="mt-4 ml-0 align-items-center">
            <h4>{{ prettyFormatDate(entityList[date][0].fixture.date) }}</h4>
            <small class="ml-auto mr-4">Matchweek {{ entityList[date][0].fixture.week }}</small>
          </b-row>
          <b-row class="mt-1" v-if="entityList != null && entityList[date] && entityList[date].length > 0">
            <b-col cols="auto" v-for="entity in entityList[date]" :key="entity.id" class="p-1 flex-grow-1 card-basis">
              <b-card
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
                <b-card-body class="d-flex p-0 pt-1 px-2 justify-content-between helper-text border-0">
                  <b-icon :icon="entity.fixture.locked ? 'lock-fill' : 'unlock'" />
                  <small>
                    {{ prettyFormatTime(entity.fixture.time) }}
                  </small>
                </b-card-body>
                <b-card-body class="px-3 py-0">
                  <b-form-radio-group
                    buttons
                    v-model="entity.prediction"
                    button-variant="prediction"
                    class="d-flex flex-wrap justify-content-around"
                    :disabled="entity.fixture.locked"
                    @input="submitPrediction(entity)"
                  >
                    <TeamButton
                      value="H"
                      :team="entity.fixture.homeTeam"
                      :showWin="entity.fixture.fixtureResult === 'H'"
                      reversed
                    />
                    <b-form-radio name="prediction" value="D" class="d-flex align-items-center mx-1 py-1">
                      <small class="mx-auto" v-show="entity.fixture.fixtureResult !== 'D'">Draw</small>
                      <div class="mx-auto small" v-show="entity.fixture.fixtureResult === 'D'">
                        <b-badge variant="success">DRAW</b-badge>
                      </div>
                    </b-form-radio>
                    <TeamButton
                      value="A"
                      :team="entity.fixture.awayTeam"
                      :showWin="entity.fixture.fixtureResult === 'A'"
                    />
                  </b-form-radio-group>
                </b-card-body>

                <transition name="zoom-in" mode="out-in">
                  <div class="w-100 p-1 helper-text" v-if="entity.prediction == null" key="helper">
                    <small><em>Tap on a team to make your prediction</em></small>
                  </div>
                  <div class="w-100 p-1 helper-text" v-else key="my-prediction">
                    <small>
                      <em>
                        My Prediction: <b>{{ formatFixtureResult(entity.prediction) }}</b>
                      </em>
                      <span v-if="entity.fixture.fixtureResult !== null">
                        | Actual Result: <b>{{ formatFixtureResult(entity.fixture.fixtureResult) }}</b>
                      </span>
                    </small>
                  </div>
                </transition>
              </b-card>
            </b-col>
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
import TeamButton from "@/components/prediction-entry/TeamButton.vue";

@Component({
  components: { TeamButton }
})
export default class PredictionEntry extends BaseComponent {
  startDate = moment()
    .startOf("week")
    .format("YYYY-MM-DD");
  endDate = moment(this.startDate)
    .add(6, "days")
    .format("YYYY-MM-DD");

  get apiEndpoint() {
    return `/iapi/predictions/bydate?startDate=${this.startDate}&endDate=${this.endDate}&user=${this.$store.state.AuthModule.user.id}`;
  }

  entityList: Dictionary<Prediction[]> | [] = [];

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
      .add(6, "days")
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
        const predictionDays = _.groupBy(json, "fixture.date");

        for (const date of Object.keys(predictionDays)) {
          predictionDays[date].sort(
            (a, b) => moment(a.fixture.time, "HH:mm").unix() - moment(b.fixture.time, "HH:mm").unix()
          );
        }

        this.entityList = predictionDays;
      });
  }

  submitPrediction(entity: Prediction & { previousPrediction: FixtureResult }) {
    // Create a new object with just the required fields we are updating,
    //  to help prevent accidental data manipulation (like with out of date data)
    const prediction: Partial<Prediction> = { id: entity.id, prediction: entity.prediction };

    this.callENKEL("/iapi/predictions", "PUT", JSON.stringify(prediction)).then(res => {
      if (res.ok) {
        this.showMessage({ message: "Prediction Submitted", variant: "success" });
        entity.previousPrediction = entity.prediction;
      } else {
        this.showMessage({ message: `Error occurred submitting prediction :( [${res.status}]`, variant: "danger" });
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

.card-basis {
  flex-basis: 300px;
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
  transition: all 0.5s ease;
  transition-delay: 0.5s;
}
.slide-down-leave-active {
  transition: all 0.5s ease;
}
.slide-down-enter {
  transform: translateY(-100px);
  opacity: 0;
}
.slide-down-leave-to {
  transform: translateY(100px);
  opacity: 0;
}
</style>
