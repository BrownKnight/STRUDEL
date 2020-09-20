<template>
  <div id="teams-page">
    <h3>Maintain Teams</h3>
    <EntityManagement
      v-bind:apiEndpoint="'/iapi/teams'"
      :entityFormComponent="TeamForm"
      :fields="fields"
    ></EntityManagement>
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component, Vue } from "vue-property-decorator";
import EntityManagement from "@/components/EntityManagement.vue";
import TeamForm from "@/components/entity-forms/TeamForm.vue";

@Component({
  components: { EntityManagement, TeamForm }
})
export default class Teams extends Vue {
  TeamForm = TeamForm;

  fields = [
    { key: "id", sortable: true, label: "id" },
    { key: "teamName", label: "Team Name", sortable: true },
    { key: "Action" }
  ];
}
</script>

<style lang="scss"></style>
