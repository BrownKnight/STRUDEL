<template>
  <div id="teams-page">
    <b-row>
      <h3 class="my-5 mx-3">Maintain Analytics</h3>
    </b-row>
    <EntityManagement
      :apiEndpoint="'/iapi/analytics'"
      :entityFormComponent="AnalyticsItemForm"
      :rowDetailsComponent="AnalyticsRowDetails"
      :fields="fields"
    ></EntityManagement>
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component, Vue } from "vue-property-decorator";
import EntityManagement from "@/components/EntityManagement.vue";
import AnalyticsItemForm from "@/components/entity-forms/AnalyticsItemForm.vue";
import AnalyticsRowDetails from "@/components/detail-views/AnalyticsRowDetails.vue";

@Component({
  components: { EntityManagement, AnalyticsItemForm }
})
export default class MaintainAnalytics extends Vue {
  AnalyticsItemForm = AnalyticsItemForm;
  AnalyticsRowDetails = AnalyticsRowDetails;

  fields = [
    { key: "id", sortable: true, label: "id" },
    { key: "name", sortable: true, label: "Name" },
    { key: "heading", label: "Heading", sortable: true },
    { key: "tagLineList", label: "Tag Line List" },
    { key: "Action" },
    { key: "expand", label: "Expand" }
  ];
}
</script>

<style lang="scss"></style>
