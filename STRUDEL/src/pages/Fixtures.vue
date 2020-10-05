<template>
  <div id="fixtures-page">
    <b-row>
      <h3 class="my-5 mx-3">{{ isAdmin() ? "Maintain" : "View" }} Fixtures</h3>
    </b-row>
    <EntityManagement
      :apiEndpoint="'/iapi/fixtures'"
      :entityFormComponent="FixtureForm"
      :rowDetailsComponent="FixtureRowDetails"
      :fields="fields"
      :populateNewEntity="populateNewEntity"
    ></EntityManagement>
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component } from "vue-property-decorator";
import EntityManagement from "@/components/EntityManagement.vue";
import FixtureForm from "@/components/entity-forms/FixtureForm.vue";
import FixtureRowDetails from "@/components/FixtureRowDetails.vue";
import { BaseComponent } from "@/components/BaseComponent.ts";

@Component({
  components: { EntityManagement, FixtureForm, FixtureRowDetails }
})
export default class Fixtures extends BaseComponent {
  FixtureForm = FixtureForm;
  FixtureRowDetails = FixtureRowDetails;
  fields: {}[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  populateNewEntity(entity: any) {
    console.log("populating");
    entity.homeTeam = {};
    entity.awayTeam = {};
    entity.prediction = null;
    entity.user = {};
  }

  created() {
    if (this.isAdmin()) {
      this.fields = [
        { key: "expand", sortable: true, label: "Expand" },
        { key: "id", sortable: true, label: "id" },
        { key: "date", sortable: true, label: "Date" },
        { key: "fixtureHomeTeam", label: "Home Team", sortable: true },
        { key: "fixtureAwayTeam", label: "Away Team", sortable: true },
        { key: "fixtureResult", label: "Result", sortable: true, formatter: this.formatFixtureResult },
        { key: "predictions", label: "# Predictions", formatter: (item: []) => item.length },
        { key: "Action", label: "Action", sortable: false }
      ];
    } else {
      this.fields = [
        { key: "date", sortable: true, label: "Date" },
        { key: "fixtureHomeTeam", label: "Home Team", sortable: true },
        { key: "fixtureAwayTeam", label: "Away Team", sortable: true },
        { key: "fixtureResult", label: "Result", sortable: true, formatter: this.formatFixtureResult }
      ];
    }
  }
}
</script>

<style lang="scss"></style>
