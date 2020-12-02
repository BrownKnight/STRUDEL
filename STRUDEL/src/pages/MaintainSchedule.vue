<template>
  <div id="maintain-schedules-page">
    <b-row>
      <h3 class="my-5 mx-3">{{ isAdmin() ? "Maintain" : "View" }} Schedules</h3>
    </b-row>

    <EntityManagement
      :apiEndpoint="'/iapi/schedules'"
      :entityFormComponent="ScheduleForm"
      :fields="fields"
      :populateNewEntity="populateNewEntity"
    ></EntityManagement>
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component } from "vue-property-decorator";
import EntityManagement from "@/components/EntityManagement.vue";
import ScheduleForm from "@/components/entity-forms/ScheduleForm.vue";
import { BaseComponent, BootstrapTableField } from "@/components/BaseComponent.ts";

@Component({
  components: { EntityManagement, ScheduleForm }
})
export default class MaintainSchedule extends BaseComponent {
  ScheduleForm = ScheduleForm;
  fields: Array<BootstrapTableField> = [
    { key: "id", sortable: true, label: "ID" },
    { key: "dateModified", sortable: true, label: "Date Modified", formatter: this.prettyFormatDateTime },
    { key: "name", sortable: true, label: "Schedule Name" },
    { key: "jobName", sortable: true, label: "Job Name" },
    { key: "cron", sortable: true, label: "CRON/Date String" },
    { key: "scheduleType", label: "Schedule Type" },
    { key: "Action", label: "Action" }
  ];
}
</script>

<style lang="scss"></style>
