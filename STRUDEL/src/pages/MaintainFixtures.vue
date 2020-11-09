<template>
  <div id="fixtures-page">
    <b-row>
      <h3 class="my-5 mx-3">{{ isAdmin() ? "Maintain" : "View" }} Fixtures</h3>
    </b-row>

    <b-row>
      <b-col cols="12" md="6" offset-md="3" class="mb-2">
        <b-input-group size="sm" prepend="Fixtures between">
          <DatePicker id="filter-start-date" v-model="startDate" />
          <b-input-group-append is-text>and</b-input-group-append>
          <DatePicker id="filter-end-date" v-model="endDate" />
        </b-input-group>
      </b-col>

      <b-col cols="10" offset="1" md="3" offset-md="0" class="mb-2">
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
      :apiEndpoint="'/iapi/fixtures'"
      :GETextension="GETextension"
      :entityFormComponent="FixtureForm"
      :rowDetailsComponent="FixtureRowDetails"
      :fields="fields"
      :populateNewEntity="populateNewEntity"
    ></EntityManagement>

    <b-row v-if="isAdmin()">
      <h3 class="my-5 mx-3">Management</h3>
    </b-row>
    <b-row v-if="isAdmin()">
      <b-col cols="12" md="6" offset-md="3">
        <b-input-group prepend="Import Fixtures for">
          <DatePicker id="import-date" v-model="importFixturesDate" />
          <b-input-group-append>
            <b-button variant="primary" @click="importFixtures()">Import</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component } from "vue-property-decorator";
import EntityManagement from "@/components/EntityManagement.vue";
import FixtureForm from "@/components/entity-forms/FixtureForm.vue";
import FixtureRowDetails from "@/components/detail-views/FixtureRowDetails.vue";
import { BaseComponent, BootstrapTableField } from "@/components/BaseComponent.ts";
import moment from "moment";
import { Fixture } from "@/ENKEL/entity/Fixture";
import { AnyEntity } from "@/ENKEL/entity/EntityHelper";
import DatePicker from "@/components/helpers/DatePicker.vue";

@Component({
  components: { EntityManagement, FixtureForm, FixtureRowDetails, DatePicker }
})
export default class MaintainFixtures extends BaseComponent {
  FixtureForm = FixtureForm;
  FixtureRowDetails = FixtureRowDetails;
  fields: Array<BootstrapTableField> = [];

  importFixturesDate = moment().format("YYYY-MM-DD");

  startDate = moment()
    .startOf("week")
    .format("YYYY-MM-DD");
  endDate = moment(this.startDate)
    .add(1, "week")
    .format("YYYY-MM-DD");

  get GETextension() {
    return `/bydate?startDate=${this.startDate}&endDate=${this.endDate}`;
  }

  populateNewEntity(entity: Fixture) {
    console.log("populating");
    entity.homeTeam = {};
    entity.awayTeam = {};
  }

  created() {
    if (this.isAdmin()) {
      this.fields = [
        { key: "expand", sortable: true, label: "Expand" },
        { key: "id", sortable: true, label: "id" },
        { key: "date", sortable: true, label: "Date", formatter: this.prettyFormatDate },
        { key: "time", sortable: true, label: "Time", formatter: this.prettyFormatTime },
        { key: "week", sortable: true, label: "Week" },
        { key: "fixtureHomeTeam", label: "Home Team", sortable: true },
        { key: "fixtureAwayTeam", label: "Away Team", sortable: true },
        { key: "fixtureResult", label: "Result", sortable: true, formatter: this.formatFixtureResult },
        { key: "predictions", label: "# Predictions", formatter: (item: AnyEntity[]) => item.length.toString() },
        { key: "Action", label: "Action", sortable: false }
      ];
    } else {
      this.fields = [
        { key: "date", sortable: true, label: "Date", formatter: this.prettyFormatDate },
        { key: "time", sortable: true, label: "Time", formatter: this.prettyFormatTime },
        { key: "fixtureHomeTeam", label: "Home Team", sortable: true },
        { key: "fixtureAwayTeam", label: "Away Team", sortable: true },
        { key: "predictions", label: "# Predictions", formatter: (item: AnyEntity[]) => item.length.toString() },
        { key: "fixtureResult", label: "Result", sortable: true, formatter: this.formatFixtureResult },
        { key: "expand", label: "Expand" }
      ];
    }
  }

  importFixtures() {
    if (this.importFixturesDate == null || this.importFixturesDate == "") {
      this.showMessage({ delay: 3, message: "Please enter a date to import fixtures for", variant: "danger" });
      return;
    }

    this.callENKEL(
      `/iapi/external/fixtures/importbydate?date=${moment(this.importFixturesDate).format("YYYY-MM-DD")}`,
      "POST"
    ).then(res => {
      res
        .text()
        .then(text => JSON.parse(text))
        .then(json => {
          if (!res.ok || !json.success) {
            this.showMessage({
              delay: 5,
              message: `Fixture import failed! ${json.errorMessage ??
                json.operationResult.message ??
                json.operationResult}`,
              variant: "danger"
            });

            return;
          }

          this.showMessage({
            delay: 3,
            message: `${json.entity.length} Fixtures imported!`,
            variant: "success"
          });
        });
    });
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
