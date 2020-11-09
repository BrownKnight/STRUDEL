<template>
  <div id="teams-page">
    <b-row>
      <h3 class="my-5 mx-3">Maintain Mined Data</h3>
    </b-row>
    <EntityManagement
      :apiEndpoint="'/iapi/mined-data'"
      :entityFormComponent="MinedDataForm"
      :rowDetailsComponent="MinedDataRowDetails"
      :fields="fields"
    ></EntityManagement>
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component, Vue } from "vue-property-decorator";
import EntityManagement from "@/components/EntityManagement.vue";
import MinedDataForm from "@/components/entity-forms/MinedDataForm.vue";
import MinedDataRowDetails from "@/components/detail-views/MinedDataRowDetails.vue";

@Component({
  components: { EntityManagement, MinedDataForm }
})
export default class MaintainMinedData extends Vue {
  MinedDataForm = MinedDataForm;
  MinedDataRowDetails = MinedDataRowDetails;

  fields = [
    { key: "id", sortable: true, label: "id" },
    { key: "name", sortable: true, label: "Name" },
    { key: "Action" },
    { key: "expand", label: "Expand" }
  ];
}
</script>

<style lang="scss"></style>
