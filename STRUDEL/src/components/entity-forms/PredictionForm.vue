<template>
  <div id="user-form">
    <b-row align-h="center">
      <b-form v-if="entityModel != null && showForm" @submit.prevent="emitSubmitEvent">
        <label class="sr-only" id="input-label-team-id" for="input-team-id">Prediction ID</label>
        <b-input-group class="mr-2 my-3" prepend="Prediction ID">
          <b-form-input id="input-team-id" v-model="entityModel.id" disabled></b-form-input>
        </b-input-group>

        <label class="sr-only" id="input-label-team-name" for="input-team-name">Fixture</label>
        <b-input-group class="my-3" prepend="Fixture">
          <b-form-input id="input-team-name" v-model.number="entityModel.fixture.id" required></b-form-input>
        </b-input-group>

        <label class="sr-only" id="input-label-team-name" for="input-team-name">User</label>
        <b-input-group class="my-3" prepend="User">
          <b-form-input id="input-team-name" v-model.number="entityModel.user.id" required></b-form-input>
        </b-input-group>

        <label class="sr-only" id="input-label-team-name" for="input-team-name">Prediction</label>
        <b-input-group class="my-3" prepend="Prediction">
          <b-form-input id="input-team-name" v-model="entityModel.prediction"></b-form-input>
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
export default class PredictionForm extends EntityForm {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createNewEntityModel(value: any) {
    value.new = null;
    value.fixture = {};
    value.user = {};
    return value;
  }
}
</script>

<style lang="scss"></style>
