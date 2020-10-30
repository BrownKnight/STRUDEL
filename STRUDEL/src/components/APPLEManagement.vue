<template>
  <div id="apple-management">
    <b-collapse :visible="isStateNotSubmitted">
      <b-form @submit.prevent="submit()">
        <b-row>
          <b-col cols="6" md="6" class="text-left">
            <b-form-group label="Job Name:" label-size="sm">
              <b-form-input v-model="appleParameters.jobName" required />
            </b-form-group>
          </b-col>

          <b-col cols="6" md="6" class="text-left">
            <b-form-group label="Week Number:" label-size="sm">
              <b-form-input type="number" v-model="appleParameters.weekNumber" required />
            </b-form-group>
          </b-col>

          <b-col cols="12" class="text-left">
            <b-form-group label="Fixtures Between:" label-size="sm">
              <b-input-group>
                <DatePicker id="start-date" v-model="appleParameters.startDate" required />
                <b-input-group-text class="no-border-radius">and</b-input-group-text>
                <DatePicker id="end-date" v-model="appleParameters.endDate" required />
              </b-input-group>
            </b-form-group>
          </b-col>

          <b-col cols="12" class="text-left">
            <b-form-group label="Data for Predictions:" label-size="sm">
              <b-form-input v-model="appleParameters.predictionData" required />
            </b-form-group>
          </b-col>

          <b-col cols="6">
            <b-form-checkbox v-model="appleParameters.backTest" switch>Back Test</b-form-checkbox>
          </b-col>
          <b-col cols="6">
            <b-form-checkbox v-model="appleParameters.cleanup" switch>Cleanup</b-form-checkbox>
          </b-col>

          <b-col class="mt-2">
            <b-button variant="success" type="submit">Start APPLE</b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-collapse>

    <b-collapse :visible="isStateTypeInProgress">
      <b-col cols="12" class="mb-3 mt-2">
        <b-spinner />
      </b-col>
      <b-badge variant="warning" v-if="isStateSubmitted">SUBMITTED</b-badge>
      <b-badge variant="warning" v-if="isStateWorking">WORKING</b-badge>
    </b-collapse>

    <b-collapse :visible="isStateComplete">
      <b-badge variant="success">COMPLETE</b-badge>
      <h6 class="text-left">Predictions Generated:</h6>
      <b-skeleton-table :rows="5" :columns="3" :table-props="{ bordered: true, striped: true }"></b-skeleton-table>
    </b-collapse>

    <b-collapse :visible="isStateFailed">
      <b-badge variant="danger">FAILED</b-badge>
    </b-collapse>

    <b-button-group>
      <b-button @click="APPLEState = APPLEStates.NotSubmitted">NotSubmitted</b-button>
      <b-button @click="APPLEState = APPLEStates.Submitted">Submitted</b-button>
      <b-button @click="APPLEState = APPLEStates.Working">Working</b-button>
      <b-button @click="APPLEState = APPLEStates.Complete">Complete</b-button>
      <b-button @click="APPLEState = APPLEStates.Failed">Failed</b-button>
    </b-button-group>
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component } from "vue-property-decorator";
import { BaseComponent } from "@/components/BaseComponent.ts";
import DatePicker from "@/components/helpers/DatePicker.vue";
import moment from "moment";

enum States {
  NotSubmitted,
  Submitted,
  Working,
  Complete,
  Failed
}

@Component({
  components: { DatePicker }
})
export default class APPLEManagement extends BaseComponent {
  appleParameters = {
    startDate: moment()
      .startOf("week")
      .format("YYYY-MM-DD"),

    endDate: moment()
      .add(1, "week")
      .format("YYYY-MM-DD"),

    predictionData: "",
    weekNumber: null,
    jobName: "",
    backTest: false,
    cleanup: false
  };
  APPLEStates = States;
  APPLEState: States = States.NotSubmitted;

  get isStateNotSubmitted() {
    return this.APPLEState == States.NotSubmitted;
  }
  get isStateSubmitted() {
    return this.APPLEState == States.Submitted;
  }
  get isStateWorking() {
    return this.APPLEState == States.Working;
  }
  get isStateComplete() {
    return this.APPLEState == States.Complete;
  }
  get isStateFailed() {
    return this.APPLEState == States.Failed;
  }

  get isStateTypeInProgress() {
    return this.isStateSubmitted || this.isStateWorking;
  }

  submit() {
    this.APPLEState = States.Submitted;
  }
}
</script>

<style lang="scss" scoped>
.no-border-radius {
  border-radius: 0;
  margin-left: -1px;
  margin-right: -2px;
}
</style>
