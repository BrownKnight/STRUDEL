<template>
  <div id="user-form">
    <p>{{ entityModel }}</p>

    <b-form v-if="entityModel != null && showForm" @submit.prevent="emitSubmitEvent">
      <b-form-group id="input-label-team-id" label="Team ID" label-for="input-team-id">
        <b-form-input id="input-team-id" v-model="entityModel.id" required disabled></b-form-input>
      </b-form-group>
      <b-form-group id="input-label-team-name" label="Team Name" label-for="input-team-name">
        <b-form-input id="input-team-name" v-model="entityModel.teamName" required></b-form-input>
      </b-form-group>
      <b-button variant="success" type="submit">Save Entity</b-button>
    </b-form>
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component } from "vue-property-decorator";
import { EntityForm } from "@/components/entity-forms/EntityForm.ts";

@Component({
  components: {}
})
export default class TeamForm extends EntityForm {}
</script>

<style lang="scss"></style>
