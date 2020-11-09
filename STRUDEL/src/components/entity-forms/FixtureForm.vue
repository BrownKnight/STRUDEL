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
          <DatePicker id="input-fixture-date" v-model="entityModel.date" required autofocus />
        </b-input-group>

        <label class="sr-only" id="input-label-fixture-time" for="input-fixture-time">Fixture Time</label>
        <b-input-group class="my-3" prepend="Fixture Time">
          <b-form-input
            id="input-fixture-time"
            v-model="entityModel.time"
            type="time"
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
import { Team } from "@/ENKEL/entity/Team";
import DatePicker from "@/components/helpers/DatePicker.vue";

@Component({
  components: { DatePicker }
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
        this.teamOptions = (teams as []).map((team: Team) => ({ value: team.id, text: team.teamName }));
      });
  }
}
</script>

<style lang="scss"></style>
