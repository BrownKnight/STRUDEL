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
          <DatePicker id="filter-start-date" v-model="startDate" />
          <b-input-group-append is-text>and</b-input-group-append>
          <DatePicker id="filter-end-date" v-model="endDate" />
        </b-input-group>
      </b-col>

      <b-col cols="8" offset="2" md="3" offset-md="0">
        <b-button-group>
          <b-button size="sm" variant="light" @click="addWeeks(-1)" class="d-flex align-items-center">
            <b-icon icon="chevron-left"></b-icon>
            Previous Week
          </b-button>
          <b-button size="sm" variant="light" @click="addWeeks(1)" class="d-flex align-items-center">
            Next Week
            <b-icon icon="chevron-right"></b-icon>
          </b-button>
        </b-button-group>
      </b-col>
    </b-row>
    <EntityManagement
      :apiEndpoint="apiEndpoint"
      :GETextension="GETextension"
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
import { BaseComponent, BootstrapTableField } from "@/components/BaseComponent.ts";
import moment from "moment";
import { UserLogin } from "@/ENKEL/entity/UserLogin";

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

  get GETextension() {
    return `/bydate?startDate=${this.startDate}&endDate=${this.endDate}`;
  }

  apiEndpoint = "/iapi/predictions";

  fields: Array<BootstrapTableField> = [];

  created() {
    if (this.isAdmin()) {
      this.fields = [
        { key: "id", sortable: true, label: "id" },
        { key: "dateModified", label: "Date Modified", sortable: true, formatter: this.prettyFormatDateTime },
        { key: "fixture.date", label: "Date", sortable: true, formatter: this.prettyFormatDate },
        { key: "fixture.time", label: "Time", sortable: true, formatter: this.prettyFormatTime },
        { key: "fixture.homeTeam.teamName", label: "Home Team", sortable: true },
        { key: "fixture.awayTeam.teamName", label: "Away Team", sortable: true },
        { key: "user", label: "User", sortable: true, formatter: (value: UserLogin) => value.fullName },
        { key: "prediction", label: "Prediction", sortable: true, formatter: this.formatFixtureResult },
        { key: "Action", label: "Action" }
      ];
    } else {
      this.fields = [
        { key: "fixture.date", label: "Date", sortable: true },
        { key: "fixture.homeTeam.teamName", label: "Home Team", sortable: true },
        { key: "fixture.awayTeam.teamName", label: "Away Team", sortable: true },
        { key: "user", label: "User", sortable: true, formatter: (value: UserLogin) => value.fullName },
        { key: "prediction", label: "Prediction", sortable: true, formatter: this.formatFixtureResult }
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
              this.showMessage({ delay: 5, message: `Could not download :( ${json.errorMessage}`, variant: "danger" });
            });
        } else {
          this.showMessage({ delay: 2, message: "Downloading...", variant: "success" });
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

  addWeeks(numWeeks: number) {
    this.startDate = moment(this.startDate)
      .add(numWeeks, "week")
      .format("YYYY-MM-DD");
    this.endDate = moment(this.endDate)
      .add(numWeeks, "week")
      .format("YYYY-MM-DD");
  }
}
</script>

<style lang="scss"></style>
