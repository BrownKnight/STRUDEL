<template>
  <div id="predictions-page">
    <b-row>
      <b-col cols="12" md="6">
        <h3 class="my-5 mb-1 text-left">{{ isAdmin() ? "Maintain" : "Everyone's" }} Predictions</h3>
      </b-col>

      <b-col cols="12" md="3" offset-md="3" class="d-flex justify-content-md-end justify-content-center">
        <b-button class="mb-1 align-self-center" size="sm" variant="outline-info" @click="downloadPredictions()">
          <b-icon class="mr-2 ml-1" icon="download"></b-icon>
          <span>Download Predictions</span>
        </b-button>
      </b-col>
    </b-row>

    <b-row class="my-2">
      <b-col cols="12" md="6" offset-md="3">
        <b-input-group size="sm" prepend="Predictions between">
          <b-form-input v-model="startDate" type="date" id="filter-start-date"></b-form-input>
          <b-input-group-append is-text>and</b-input-group-append>
          <b-form-input v-model="endDate" type="date" id="filter-end-date"></b-form-input>
        </b-input-group>
      </b-col>
    </b-row>
    <EntityManagement
      :apiEndpoint="apiEndpoint"
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
    .format("YYYY-MM-DD");
  endDate = moment(this.startDate)
    .add(1, "week")
    .format("YYYY-MM-DD");

  get apiEndpoint() {
    return `/iapi/predictions/bydate?startDate=${this.startDate}&endDate=${this.endDate}`;
  }

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
    this.callENKEL(`/iapi/fixtures/bydate?startDate=${this.startDate}&endDate=${this.endDate}&format=csv`, "GET").then(
      res => {
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
      }
    );
  }
}
</script>

<style lang="scss"></style>
