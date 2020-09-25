<template>
  <div id="fixture-form">
    <b-row align-h="center">
      <b-form v-if="entityModel != null && showForm" @submit.prevent="emitSubmitEvent">
        <label class="sr-only" id="input-label-team-id" for="input-team-id">Fixture ID</label>
        <b-input-group class="mr-2 my-3" prepend="Fixture ID">
          <b-form-input id="input-team-id" v-model.number="entityModel.id" disabled></b-form-input>
        </b-input-group>

        <label class="sr-only" id="input-label-fixture-date" for="input-fixture-date">Fixture Date</label>
        <b-input-group class="my-3" prepend="Fixture Date">
          <b-form-input
            id="input-fixture-date"
            v-model="entityModel.date"
            type="date"
            required
            autofocus
          ></b-form-input>
        </b-input-group>

        <label class="sr-only" id="input-label-home-team" for="input-home-team">Home Team</label>
        <b-input-group class="my-3" prepend="Home Team">
          <b-form-select
            id="input-home-team"
            v-model.number="entityModel.homeTeam.id"
            required
            :options="teamOptions"
          ></b-form-select>
        </b-input-group>

        <label class="sr-only" id="input-label-away-team" for="input-away-team">Away Team</label>
        <b-input-group class="my-3" prepend="Away Team">
          <b-form-select
            id="input-away-team"
            v-model.number="entityModel.awayTeam.id"
            required
            :options="teamOptions"
          ></b-form-select>
        </b-input-group>

        <label class="sr-only" id="input-label-result" for="input-result">Result</label>
        <b-input-group class="my-3" prepend="Result">
          <b-form-select id="input-result" v-model="entityModel.fixtureResult" :options="resultOptions"></b-form-select>
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
export default class FixtureForm extends EntityForm {
  teamOptions: {}[] = [];
  resultOptions = [
    { value: null, text: "Fixture Result", disabled: true },
    { value: null, text: "Unknown" },
    { value: "H", text: "Home Win" },
    { value: "A", text: "Away Win" },
    { value: "D", text: "Draw" }
  ];

  created() {
    this.getTeamList();
  }

  getTeamList() {
    this.callENKEL("/iapi/teams", "GET")
      .then(res => res.json())
      .then(teams => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.teamOptions = (teams as []).map((team: any) => ({ value: team.id, text: team.teamName }));
      });
  }
}
</script>

<style lang="scss"></style>
