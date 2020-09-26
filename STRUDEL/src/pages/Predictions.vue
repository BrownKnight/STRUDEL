<template>
  <div id="predictions-page">
    <b-row class="my-5 mx-1">
      <h3 class="mb-1">{{ isAdmin() ? "Maintain" : "Everyone's" }} Predictions</h3>
      <b-button class="ml-auto mb-1" size="sm" variant="outline-info" @click="downloadPredictions()">
        <b-icon class="mr-2 ml-1" icon="download"></b-icon>
        <span>Download Predictions</span>
      </b-button>
    </b-row>
    <EntityManagement
      v-bind:apiEndpoint="'/iapi/predictions'"
      :entityFormComponent="PredictionForm"
      :fields="fields"
    ></EntityManagement>
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component } from "vue-property-decorator";
import EntityManagement from "@/components/EntityManagement.vue";
import PredictionForm from "@/components/entity-forms/PredictionForm.vue";
import { BaseComponent } from "@/components/BaseComponent.ts";
import moment from "moment";

@Component({
  components: { EntityManagement, PredictionForm }
})
export default class Predictions extends BaseComponent {
  PredictionForm = PredictionForm;

  startDate = moment()
    .startOf("week")
    .add(3, "day");
  endDate = moment(this.startDate)
    .add(1, "week")
    .add(1, "day");

  fields = [
    { key: "id", sortable: true, label: "id" },
    { key: "fixture.homeTeam.teamName", label: "Home Team", sortable: true },
    { key: "fixture.awayTeam.teamName", label: "Away Team", sortable: true },
    {
      key: "user",
      label: "User",
      sortable: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formatter: (value: any) => `${value.fullName} (${value.id})`
    },
    { key: "prediction", label: "Prediction", sortable: true },
    { key: "Action" }
  ];

  created() {
    if (this.isAdmin()) {
      this.fields = [
        { key: "id", sortable: true, label: "id" },
        { key: "fixture.date", label: "Date", sortable: true },
        { key: "fixture.homeTeam.teamName", label: "Home Team", sortable: true },
        { key: "fixture.awayTeam.teamName", label: "Away Team", sortable: true },
        { key: "user", label: "User", sortable: true, formatter: value => `${value.fullName} (${value.id})` },
        { key: "prediction", label: "Prediction", sortable: true },
        { key: "Action" }
      ];
    } else {
      this.fields = [
        { key: "fixture.date", label: "Date", sortable: true },
        { key: "fixture.homeTeam.teamName", label: "Home Team", sortable: true },
        { key: "fixture.awayTeam.teamName", label: "Away Team", sortable: true },
        { key: "user", label: "User", sortable: true, formatter: value => `${value.fullName}` },
        { key: "prediction", label: "Prediction", sortable: true }
      ];
    }
  }

  downloadPredictions() {
    this.callENKEL(
      `/iapi/fixtures/bydate?startDate=${this.startDate.format("YYYY-MM-DD")}&endDate=${this.endDate.format(
        "YYYY-MM-DD"
      )}&format=csv`,
      "GET"
    ).then(res => {
      if (!res.ok) {
        res
          .text()
          .then(text => JSON.parse(text))
          .then(json => {
            this.showEntityAlert(5, `"Could not download :( ${json.errorMessage}`, "danger");
          });
      } else {
        this.showEntityAlert(2, "Downloading...", "success");
        res.text().then(text => {
          const element = document.createElement("a");
          element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
          element.setAttribute("download", "fixture_predictions.csv");

          element.style.display = "none";
          document.body.appendChild(element);

          element.click();

          document.body.removeChild(element);
        });
      }
    });
  }
}
</script>

<style lang="scss"></style>
