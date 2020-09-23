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
import { Component, Prop } from "vue-property-decorator";
import { BaseComponent } from "@/components/BaseComponent.ts";

@Component({
  components: {}
})
export default class PredictionEntry extends BaseComponent {
  entityList: unknown[] = [];

  predictionChanges = true;

  ok = "";

  fields = [
    { key: "fixture.date", label: "Date", sortable: true },
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
    return await this.callENKEL("/iapi/predictions")
      .then(res => res.json())
      .then(json => {
        json.forEach((element: { changePrediction: boolean }) => {
          element.changePrediction = false;
        });
        this.entityList = json;
      });
  }

  submitPrediction(entity: any) {
    this.callENKEL("/iapi/predictions", "PUT", JSON.stringify(entity)).then(res => {
      if (res.ok) {
        this.showMessage("Prediction Submitted", "success");
        entity.changePrediction = false;
      } else {
        this.showMessage(`Error occurred submitting prediction :( [${res.status}]`, "danger");
      }
    });
  }

  created() {
    this.getAllEntities();
  }

  showMessage(message: string, variant?: string, delay?: number) {
    this.$bvToast.toast(message, {
      noCloseButton: true,
      variant: variant,
      autoHideDelay: 50000,
      toaster: "b-toaster-top-right",
      href: "javascript:$bvToast.hide()"
    });
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
