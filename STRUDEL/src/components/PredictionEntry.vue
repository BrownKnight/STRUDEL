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
    >
      <template v-slot:cell(homeTeam)="data"> {{ data.item.fixture.homeTeam.teamName }} [Logo] </template>
      <template v-slot:cell(awayTeam)="data"> [Logo] {{ data.item.fixture.awayTeam.teamName }} </template>

      <template v-slot:cell(prediction)="data">
        <b-col class="w-75 mx-auto">
          <b-input-group size="sm" align-self="center">
            <b-form-select
              id="my-prediction"
              v-model="data.item.prediction"
              :options="predictionOptions"
              :disabled="!data.item.changePrediction"
            ></b-form-select>
            <b-input-group-append>
              <b-button
                variant="secondary"
                v-if="!data.item.changePrediction"
                @click="data.item.changePrediction = true"
                >Change</b-button
              >
              <b-button variant="danger" v-if="data.item.changePrediction" @click="data.item.changePrediction = false"
                >Cancel</b-button
              >
              <b-button variant="success" v-if="data.item.changePrediction" @click="submitPrediction(data.item)"
                >Submit</b-button
              >
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
    { value: null, text: "No Prediction" },
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
        json.forEach((element: { changePrediction: boolean }) => {
          element.changePrediction = false;
        });
        this.entityList = json;
      });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  submitPrediction(entity: any) {
    this.callENKEL("/iapi/predictions", "PUT", JSON.stringify(entity)).then(res => {
      if (res.ok) {
        this.showMessage({ message: "Prediction Submitted", variant: "success" });
        entity.changePrediction = false;
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
      autoHideDelay: delay ?? 5000,
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
