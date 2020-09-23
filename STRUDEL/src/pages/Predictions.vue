<template>
  <div id="predictions-page">
    <b-row>
      <h3 class="my-5 mx-3">{{ isAdmin() ? "Maintain" : "View" }} Predictions</h3>
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
import { Component, Vue } from "vue-property-decorator";
import EntityManagement from "@/components/EntityManagement.vue";
import PredictionForm from "@/components/entity-forms/PredictionForm.vue";
import { BaseComponent } from "@/components/BaseComponent.ts";

@Component({
  components: { EntityManagement, PredictionForm }
})
export default class Predictions extends BaseComponent {
  PredictionForm = PredictionForm;

  fields = [
    { key: "id", sortable: true, label: "id" },
    { key: "fixture.homeTeam.teamName", label: "Home Team", sortable: true },
    { key: "fixture.awayTeam.teamName", label: "Away Team", sortable: true },
    { key: "user.id", label: "User", sortable: true },
    { key: "prediction", label: "Prediction", sortable: true },
    { key: "Action" }
  ];

  created() {
    if (this.isAdmin()) {
      this.fields = [
        { key: "id", sortable: true, label: "id" },
        { key: "fixture.homeTeam.teamName", label: "Home Team", sortable: true },
        { key: "fixture.awayTeam.teamName", label: "Away Team", sortable: true },
        { key: "user.id", label: "User", sortable: true },
        { key: "prediction", label: "Prediction", sortable: true },
        { key: "Action" }
      ];
    } else {
      this.fields = [
        { key: "fixture.homeTeam.teamName", label: "Home Team", sortable: true },
        { key: "fixture.awayTeam.teamName", label: "Away Team", sortable: true },
        { key: "user.fullName", label: "User", sortable: true },
        { key: "prediction", label: "Prediction", sortable: true },
      ];
    }
  }
}
</script>

<style lang="scss"></style>
