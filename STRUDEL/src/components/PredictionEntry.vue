<template>
  <div id="entity-management">
    <p v-if="entityList == []">Loading...</p>
    <b-table
      striped
      :items="entityList"
      :fields="fields"
      show-empty
      outline
      borderless
      head-variant="dark"
      stacked="sm"
      table-variant="white"
    >
      <template v-slot:cell(date)="data">
        {{ formatDate(data.item.fixture.date) }}
      </template>

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
    { key: "date", label: "Date", sortable: true },
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

  created() {
    this.startDate = moment().startOf("week");
    this.endDate = moment(this.startDate).add(1, "week");
    this.getAllEntities();
  }

  showMessage({ message, variant, delay }: { message: string; variant?: string; delay?: number }) {
    this.$bvToast.toast(message, {
      noCloseButton: true,
      variant: variant,
      autoHideDelay: delay,
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
