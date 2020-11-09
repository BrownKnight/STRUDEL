<template>
  <div id="fixtures-page">
    <b-row>
      <h3 class="my-5 mx-3">{{ isAdmin() ? "Maintain" : "View" }} Fixtures</h3>
    </b-row>

    <b-row>
      <b-col cols="12" md="6" offset-md="3" class="mb-2">
        <b-input-group size="sm" prepend="Fixtures between">
          <DatePicker id="filter-start-date" v-model="startDate" />
          <b-input-group-append is-text>and</b-input-group-append>
          <DatePicker id="filter-end-date" v-model="endDate" />
        </b-input-group>
      </b-col>

      <b-col cols="10" offset="1" md="3" offset-md="0" class="mb-2">
        <b-button-group>
          <b-button size="sm" variant="light" @click="addWeeks(-1)" class="d-flex align-items-center">
            <b-icon icon="chevron-left"></b-icon>
            Previous Week
          </b-button>
          <b-button size="sm" variant="light" @click="addWeeks(1)" class="d-flex align-items-center">
            Next Week
            <b-icon icon="chevron-right"></b-icon>
          </b-button>
        </b-button-group>
      </b-col>
    </b-row>

    <b-row>
      <b-list-group class="w-100">
        <b-list-group-item v-for="fixture in entityList" :key="fixture.id" class="d-flex px-1 flex-wrap py-1">
          <b-container>
            <b-row>
              <b-col cols="6" md="2" class="text-left order-0 order-md-0">
                <small>{{ prettyFormatDate(fixture.date) }}</small>
                <br />
                <small>
                  <strong>{{ prettyFormatTime(fixture.time) }}</strong>
                </small>
              </b-col>

              <b-col
                cols="6"
                md="3"
                class="d-flex px-0 align-items-center justify-content-end order-3 order-md-1 mb-2 mb-md-0"
              >
                <b-badge variant="success" v-if="fixture.fixtureResult === 'H'">WIN</b-badge>
                <span class="mx-2">{{ fixture.homeTeam.teamName }}</span>
                <img :src="fixture.homeTeam.teamLogoUrl" alt="Home Team Logo" class="team-logo mx-2" />
              </b-col>
              <b-col cols="12" md="2" class="d-flex px-0 align-items-center justify-content-center order-2 order-md-1">
                <b-badge variant="warning" v-if="fixture.fixtureResult === 'D'" class="mt-0 mb-2 m-md-0">DRAW</b-badge>
              </b-col>
              <b-col
                cols="6"
                md="4"
                class="d-flex px-0 align-items-center justify-content-start order-4 order-md-2 mb-2 mb-md-0"
              >
                <img :src="fixture.awayTeam.teamLogoUrl" alt="Away Team Logo" class="team-logo mx-2" />
                <span class="mx-2">{{ fixture.awayTeam.teamName }}</span>
                <b-badge variant="success" v-if="fixture.fixtureResult === 'A'">WIN</b-badge>
              </b-col>

              <b-col
                cols="6"
                md="1"
                class="d-flex text-right order-1 order-md-3 align-items-center justify-content-end"
              >
                <b-button
                  class="mx-1"
                  variant="outline-primary"
                  size="sm"
                  @click="fixture._edit = true"
                  v-if="isAdmin() && !fixture._edit"
                  >Edit</b-button
                >
                <b-button
                  class="mx-1"
                  variant="success"
                  size="sm"
                  @click="submitFixtureResult(fixture, 'Fixture Result Submitted')"
                  v-if="isAdmin() && fixture._edit"
                  >Save</b-button
                >
                <b-button
                  class="mx-1"
                  variant="outline-danger"
                  size="sm"
                  @click="fixture._edit = false"
                  v-if="isAdmin() && fixture._edit"
                  >Cancel</b-button
                >
                <b-link :disabled="!isAdmin()" @click="setLockedState(fixture, !fixture.locked)">
                  <b-icon class="ml-1 mr-2" :icon="fixture.locked ? 'lock-fill' : 'unlock'" />
                </b-link>
                <a @click="fixture._showDetails = !fixture._showDetails">
                  <b-icon :icon="fixture._showDetails ? 'chevron-up' : 'chevron-down'"></b-icon>
                </a>
                <b-badge variant="info" class="ml-2">{{ fixture.predictions.length }}</b-badge>
              </b-col>
            </b-row>

            <b-row v-if="isAdmin() && fixture._edit" class="my-2">
              <b-col cols="8" offset="2">
                <b-form-radio-group
                  :options="fixturesResultOptions"
                  buttons
                  button-variant="outline-primary"
                  size="sm"
                  v-model="fixture.fixtureResult"
                  class="d-block"
                >
                </b-form-radio-group>
              </b-col>
            </b-row>

            <FixtureRowDetails :data="{ item: fixture }" v-if="fixture._showDetails" class="mt-1" />
          </b-container>
        </b-list-group-item>
      </b-list-group>
    </b-row>

    <b-row class="justify-content-center mt-2">
      <b-button class="mx-1" variant="outline-primary" @click="toggleAllRows()" size="sm"
        >Show All Predictions</b-button
      >
      <b-button
        class="mx-1"
        variant="outline-dark"
        @click="setLockedOnAllFixtures(true)"
        size="sm"
        v-if="isAdmin() && entityList.some(fixture => !fixture.locked)"
      >
        Lock All
      </b-button>
      <b-button
        class="mx-1"
        variant="outline-dark"
        @click="setLockedOnAllFixtures(false)"
        size="sm"
        v-if="isAdmin() && entityList.some(fixture => fixture.locked)"
      >
        Unlock All
      </b-button>
    </b-row>
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component, Watch } from "vue-property-decorator";
import FixtureRowDetails from "@/components/detail-views/FixtureRowDetails.vue";
import { BaseComponent } from "@/components/BaseComponent.ts";
import moment from "moment";
import { Fixture } from "@/ENKEL/entity/Fixture";
import { AnyEntity } from "@/ENKEL/entity/EntityHelper";
import DatePicker from "@/components/helpers/DatePicker.vue";

@Component({
  components: { FixtureRowDetails, DatePicker }
})
export default class Fixtures extends BaseComponent {
  entityList = [];

  fixturesResultOptions = [
    { text: "Home", value: "H" },
    { text: "Draw", value: "D" },
    { text: "Away", value: "A" }
  ];

  startDate = moment()
    .startOf("week")
    .format("YYYY-MM-DD");
  endDate = moment(this.startDate)
    .add(1, "week")
    .format("YYYY-MM-DD");

  get apiEndpoint() {
    return `/iapi/fixtures/bydate?startDate=${this.startDate}&endDate=${this.endDate}`;
  }

  @Watch("apiEndpoint")
  async getAllFixtures() {
    return await this.callENKEL(this.apiEndpoint)
      .then(res => res.json())
      .then(json => {
        json.forEach((entity: AnyEntity & { _showDetails: boolean; _edit: boolean }) => {
          entity._showDetails = false;
          entity._edit = false;
        });
        this.entityList = json;
      });
  }

  created() {
    this.getAllFixtures();
  }

  addWeeks(numWeeks: number) {
    this.startDate = moment(this.startDate)
      .add(numWeeks, "week")
      .format("YYYY-MM-DD");
    this.endDate = moment(this.endDate)
      .add(numWeeks, "week")
      .format("YYYY-MM-DD");
  }

  submitFixtureResult(fixture: Fixture & { _edit: boolean }, successMessage: string) {
    this.callENKEL(
      "/iapi/fixtures",
      "PUT",
      JSON.stringify({ id: fixture.id, fixtureResult: fixture.fixtureResult, locked: fixture.locked })
    ).then(res => {
      if (res.ok) {
        this.showMessage({ message: successMessage, variant: "success", delay: 1 });
        fixture._edit = false;
      } else {
        this.showMessage({ message: `Error occurred submitting fixture :( [${res.status}]`, variant: "danger" });
      }
    });
  }

  toggleAllRows() {
    this.entityList.forEach((entity: { _showDetails: boolean }) => {
      entity._showDetails = !entity._showDetails;
    });
  }

  setLockedState(fixture: Fixture & { _edit: boolean }, locked: boolean) {
    if (!this.isAdmin()) {
      return;
    }

    fixture.locked = locked;
    this.submitFixtureResult(fixture, `Fixture ${fixture.locked ? "Locked" : "Unlocked"}`);
  }

  setLockedOnAllFixtures(locked: boolean) {
    this.entityList.forEach(fixture => {
      this.setLockedState(fixture, locked);
    });
  }
}
</script>

<style lang="scss">
.team-logo {
  height: 2.5em;
}

a.disabled {
  pointer-events: none;
  color: darkgray;
}
</style>
