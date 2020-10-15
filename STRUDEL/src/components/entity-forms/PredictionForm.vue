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
          <b-form-select
            id="input-fixture"
            v-model="entityModel.fixture.id"
            :options="fixtureOptions"
            required
          ></b-form-select>
        </b-input-group>

        <label class="sr-only" id="input-label-user" for="input-user">User</label>
        <b-input-group class="my-3" prepend="User">
          <b-form-select id="input-user" v-model="entityModel.user.id" :options="userOptions" required></b-form-select>
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
import { Prediction } from "@/ENKEL/entity/Prediction";
import { NewEntity } from "../BaseComponent";
import { UserLogin } from "@/ENKEL/entity/UserLogin";
import { Fixture } from "@/ENKEL/entity/Fixture";

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

  userOptions = [];
  fixtureOptions = [];

  created() {
    this.populateUserList();
    this.populateFixtureList();
  }

  createNewEntityModel(value: Prediction & NewEntity) {
    value.new = true;
    value.fixture = {};
    value.user = {};
    return value;
  }

  populateUserList() {
    this.callENKEL("/iapi/users")
      .then(res => res.json())
      .then(json => {
        json = (json as Array<UserLogin>).sort((a, b) => a.fullName.localeCompare(b.fullName));

        this.userOptions = json.map((entity: UserLogin) => {
          return {
            value: entity.id,
            text: `${entity.fullName} (${entity.id})`
          };
        });
      });
  }

  populateFixtureList() {
    this.callENKEL("/iapi/fixtures")
      .then(res => res.json())
      .then(json => {
        json = (json as Array<Fixture>).sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

        this.fixtureOptions = json.map((entity: Fixture) => {
          return {
            value: entity.id,
            text: `${entity.date}: ${entity.homeTeam.teamName} v ${entity.awayTeam.teamName}`
          };
        });
      });
  }
}
</script>

<style lang="scss"></style>
