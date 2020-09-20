<template>
  <div id="predictions-page">
    <h3>Maintain Predictions</h3>
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

@Component({
  components: { EntityManagement, PredictionForm }
})
export default class Predictions extends Vue {
  PredictionForm = PredictionForm;

  fields = [
    { key: "id", sortable: true, label: "id" },
    { key: "fixture.homeTeam.teamName", label: "Home Team", sortable: true },
    { key: "fixture.awayTeam.teamName", label: "Away Team", sortable: true },
    { key: "user.id", label: "User", sortable: true },
    { key: "prediction", label: "Prediction", sortable: true },
    { key: "Action" }
  ];
}
</script>

<style lang="scss"></style>
