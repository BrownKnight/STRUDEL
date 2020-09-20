<template>
  <div id="hey">
    <h3>Teams</h3>
    <EntityManagement v-bind:apiEndpoint="'/iapi/teams'" :entityFormComponent="TeamForm"></EntityManagement>
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component, Prop, Vue } from "vue-property-decorator";
import EntityManagement from "@/components/EntityManagement.vue";
import TeamForm from "@/components/entity-forms/TeamForm.vue";

@Component({
  components: { EntityManagement, TeamForm }
})
export default class Teams extends Vue {
  TeamForm = TeamForm;
}
</script>

<style lang="scss"></style>
