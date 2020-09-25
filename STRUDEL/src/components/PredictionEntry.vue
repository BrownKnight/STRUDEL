<template>
  <div id="entity-management">
    <b-button
      v-if="!entityList || entityList.length === 0"
      variant="outline-success"
      size="lg"
      @click="generateThisWeeksPredictionsForUser()"
      >Predict This Weeks Fixtures</b-button
    >
    <b-table
      v-if="entityList && entityList.length > 0"
      striped
      :items="entityList"
      :fields="fields"
      show-empty
      outline
      borderless
      head-variant="dark"
      stacked="sm"
      table-variant="white"
      :sort-by="'fixture.date'"
      small
    >
      <template v-slot:cell(homeTeam)="data"> {{ data.item.fixture.homeTeam.teamName }} [Logo] </template>
      <template v-slot:cell(awayTeam)="data"> [Logo] {{ data.item.fixture.awayTeam.teamName }} </template>

      <template v-slot:cell(prediction)="data">
        <b-col class="mx-auto prediction-column">
          <b-input-group size="sm" style="justify-content:stretch">
            <b-form-radio-group
              id="my-prediction"
              v-model="data.item.prediction"
              :options="predictionOptions"
              buttons
              size="sm"
              name="my-prediction"
              button-variant="outline-primary"
              class="flex-grow-1"
            ></b-form-radio-group>
            <b-input-group-append class="flex-grow-1" v-if="data.item.previousPrediction !== data.item.prediction">
              <b-button class="w-100" variant="success" @click="submitPrediction(data.item)">Confirm</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </template>
    </b-table>
    <p>{{ ok }}</p>
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component } from "vue-property-decorator";
import { BaseComponent } from "@/components/BaseComponent.ts";
import moment, { Moment } from "moment";

@Component({
  components: {}
})
export default class PredictionEntry extends BaseComponent {
  startDate?: Moment;
  endDate?: Moment;

  entityList: unknown[] = [];

  predictionChanges = true;

  ok = "";

  fields = [
    { key: "fixture.date", label: "Date", sortable: true, formatter: this.formatDate },
    { key: "homeTeam", label: "Home Team", sortable: true },
    { key: "awayTeam", label: "Away Team", sortable: true },
    { key: "prediction", label: "My Prediction" }
  ];

  predictionOptions = [
    { value: "H", text: "Home Win" },
    { value: "A", text: "Away Win" },
    { value: "D", text: "Draw" }
  ];

  created() {
    this.startDate = moment()
      .startOf("week")
      .add(3, "day");
    this.endDate = moment(this.startDate).add(1, "week");
    this.getAllEntities();
  }

  async getAllEntities() {
    if (!this.startDate || !this.endDate) {
      return;
    }

    return await this.callENKEL(
      `/iapi/predictions/bydate?startDate=${this.startDate.format("YYYY MM DD")}&endDate=${this.endDate.format(
        "YYYY MM DD"
      )}&user=${this.$store.state.AuthModule.user.id}`
    )
      .then(res => res.json())
      .then(json => {
        json.forEach((element: { previousPrediction: string; prediction: string }) => {
          element.previousPrediction = element.prediction;
        });
        this.entityList = json;
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

  formatDate(date: string | Date): string {
    return moment(date).format("ddd, Do MMM");
  }
}
</script>

<style lang="scss">
.b-toaster-top-right {
  top: 56px !important;
}

.toast-body {
  text-decoration: none !important;
  color: inherit !important;
}
</style>
