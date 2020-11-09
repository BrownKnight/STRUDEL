<template>
  <div id="mined-data-form">
    <b-row align-h="center">
      <b-form v-if="entityModel != null && showForm" @submit.prevent="emitSubmitEvent">
        <label class="sr-only" id="input-label-mined-data-id" for="input-mined-data-id">Analytics Item ID</label>
        <b-input-group class="mr-2 my-2" prepend="Analytics Item ID">
          <b-form-input id="input-mined-data-id" v-model="entityModel.id" required disabled></b-form-input>
        </b-input-group>

        <label class="sr-only" id="input-label-mined-data-name" for="input-mined-data-name">Name</label>
        <b-input-group class="my-2" prepend="Name">
          <b-form-input id="input-mined-data-name" v-model="entityModel.name" required></b-form-input>
        </b-input-group>

        <label class="sr-only" id="input-label-mined-data-json" for="input-mined-data-json">JSON</label>
        <b-input-group class="my-2" prepend="JSON">
          <b-form-input id="input-mined-data-json" v-model="entityModel.json" required></b-form-input>
        </b-input-group>

        <b-button class="ml-2 my-2" variant="success" type="submit">Save Entity</b-button>

        <AnalyticsRowDetails :data="{ item: entityModel }"></AnalyticsRowDetails>
      </b-form>
    </b-row>
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component } from "vue-property-decorator";
import { EntityForm } from "@/components/entity-forms/EntityForm.ts";
import MinedDataRowDetails from "@/components/detail-views/MinedDataRowDetails.vue";

@Component({
  components: { MinedDataRowDetails }
})
export default class MinedDataForm extends EntityForm {}
</script>

<style lang="scss"></style>
