<template>
  <div id="schedule-form">
    <b-row align-h="center">
      <b-form v-if="entityModel != null && showForm" @submit.prevent="emitSubmitEvent">
        <label class="sr-only" id="input-label-schedule-id" for="input-schedule-id">Schedule Item ID</label>
        <b-input-group class="mr-2 my-2" prepend="Schedule ID">
          <b-form-input id="input-schedule-id" v-model="entityModel.id" required disabled></b-form-input>
        </b-input-group>

        <label class="sr-only" id="input-label-schedule-name" for="input-schedule-name">Name</label>
        <b-input-group class="my-2" prepend="Name">
          <b-form-input id="input-schedule-name" v-model="entityModel.name" required></b-form-input>
        </b-input-group>

        <label class="sr-only" id="input-label-schedule-job-name" for="input-schedule-job-name">Job</label>
        <b-input-group class="my-2" prepend="Job">
          <EntitySelect
            id="input-schedule-job-name"
            v-model="entityModel.jobName"
            optionsEndpoint="/iapi/schedules/joblist"
            :optionTextFunction="entity => entity"
          />
        </b-input-group>

        <label class="sr-only" id="input-label-schedule-cron-string" for="input-schedule-cron-string">Job</label>
        <b-input-group class="my-2" prepend="CRON">
          <b-form-input id="input-schedule-cron-string" v-model="entityModel.cron" required></b-form-input>
        </b-input-group>

        <label class="sr-only" id="input-label-schedule-schedule-type" for="input-schedule-schedule-type">Job</label>
        <b-input-group class="my-2" prepend="Type">
          <b-form-select
            id="input-schedule-schedule-type"
            v-model="entityModel.scheduleType"
            required
            :options="options"
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
import EntitySelect from "@/components/helpers/EntitySelect.vue";

@Component({
  components: { EntitySelect }
})
export default class ScheduleForm extends EntityForm {
  options = [
    { value: "D", text: "Dynamic" },
    { value: "P", text: "Persistent" }
  ];
}
</script>

<style lang="scss"></style>
