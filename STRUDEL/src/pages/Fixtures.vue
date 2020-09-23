<template>
  <div id="fixtures-page">
    <b-row>
      <h3 class="my-5 mx-3">Maintain Fixtures</h3>
    </b-row>
    <EntityManagement
      v-bind:apiEndpoint="'/iapi/fixtures'"
      :entityFormComponent="FixtureForm"
      :fields="fields"
    ></EntityManagement>
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component, Vue } from "vue-property-decorator";
import EntityManagement from "@/components/EntityManagement.vue";
import FixtureForm from "@/components/entity-forms/FixtureForm.vue";

@Component({
  components: { EntityManagement, FixtureForm }
})
export default class Teams extends Vue {
  FixtureForm = FixtureForm;

  fields = [
    { key: "id", sortable: true, label: "id" },
    { key: "date", sortable: true, label: "Fixture Date" },
    { key: "homeTeam.teamName", label: "Home Team", sortable: true },
    { key: "awayTeam.teamName", label: "Away Team", sortable: true },
    { key: "fixtureResult", label: "Fixture Result", sortable: true },
    { key: "Action" }
  ];
}
</script>

<style lang="scss"></style>
