<template>
  <div id="apple-management">
    <b-collapse v-model="showForm">
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

    <b-collapse v-model="showProgress">
      <b-col cols="12" class="mb-3 mt-2">
        <b-spinner />
      </b-col>
      <b-badge variant="warning">Submitted</b-badge>
    </b-collapse>
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component } from "vue-property-decorator";
import { BaseComponent } from "@/components/BaseComponent.ts";
import DatePicker from "@/components/helpers/DatePicker.vue";
import moment from "moment";

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

  showForm = true;
  get showProgress() {
    return !this.showForm;
  }

  submit() {
    this.showForm = false;
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
