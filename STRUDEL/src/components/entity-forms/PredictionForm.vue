<template>
  <div id="user-form">
    <b-row align-h="center">
      <b-form v-if="entityModel != null && showForm" @submit.prevent="emitSubmitEvent">
        <label class="sr-only" id="input-label-prediction-id" for="input-prediction-id">Prediction ID</label>
        <b-input-group class="mr-2 my-3" prepend="Prediction ID">
          <b-form-input id="input-prediction-id" v-model="entityModel.id" disabled></b-form-input>
        </b-input-group>

        <label class="sr-only" id="input-label-fixture" for="input-fixture">Fixture</label>
        <b-input-group class="my-3" prepend="Fixture">
          <b-form-input id="input-fixture" v-model.number="entityModel.fixture.id" required></b-form-input>
        </b-input-group>

        <label class="sr-only" id="input-label-user" for="input-user">User</label>
        <b-input-group class="my-3" prepend="User">
          <b-form-input id="input-user" v-model.number="entityModel.user.id" required></b-form-input>
        </b-input-group>

        <label class="sr-only" id="input-label-prediction" for="input-prediction">Prediction</label>
        <b-input-group class="my-3" prepend="Prediction">
          <b-form-select
            id="input-prediction"
            :options="predictionOptions"
            v-model="entityModel.prediction"
          ></b-form-select>
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
  predictionOptions = [
    { value: null, text: "Prediction", disabled: true },
    { value: "H", text: "Home Win" },
    { value: "D", text: "Draw" },
    { value: "A", text: "Away Win" }
  ];

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
