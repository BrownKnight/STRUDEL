<template>
  <div id="user-form">
    <b-row align-h="center">
      <b-form v-if="entityModel != null && showForm" @submit.prevent="emitSubmitEvent" inline>
        <label class="sr-only" id="input-label-team-id" for="input-team-id">Team ID</label>
        <b-input-group class="mr-2 my-2" prepend="Team ID">
          <b-form-input id="input-team-id" v-model="entityModel.id" required disabled></b-form-input>
        </b-input-group>

        <label class="sr-only" id="input-label-team-name" for="input-team-name">Team Name</label>
        <b-input-group class="my-2" prepend="Team Name">
          <b-form-input id="input-team-name" v-model="entityModel.teamName" required></b-form-input>
        </b-input-group>

        <b-button class="ml-2 my-2" variant="success" type="submit">Save Entity</b-button>
      </b-form>
    </b-row>
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
