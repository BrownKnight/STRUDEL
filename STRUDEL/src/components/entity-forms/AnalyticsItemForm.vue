<template>
  <div id="analytics-item-form">
    <b-row align-h="center">
      <b-form v-if="entityModel != null && showForm" @submit.prevent="emitSubmitEvent">
        <label class="sr-only" id="input-label-analytics-id" for="input-analytics-id">Analytics Item ID</label>
        <b-input-group class="mr-2 my-2" prepend="Analytics Item ID">
          <b-form-input id="input-analytics-id" v-model="entityModel.id" required disabled></b-form-input>
        </b-input-group>

        <label class="sr-only" id="input-label-analytics-name" for="input-analytics-name">Name</label>
        <b-input-group class="my-2" prepend="Name">
          <b-form-input id="input-analytics-name" v-model="entityModel.name" required></b-form-input>
        </b-input-group>

        <label class="sr-only" id="input-label-analytics-heading" for="input-analytics-heading">Heading</label>
        <b-input-group class="my-2" prepend="Heading">
          <b-form-input id="input-analytics-heading" v-model="entityModel.heading" required></b-form-input>
        </b-input-group>

        <label class="sr-only" id="input-label-analytics-tag-lines" for="input-analytics-tag-lines">Tag Lines</label>
        <b-input-group class="my-2" prepend="Tag Lines">
          <b-form-input id="input-analytics-tag-lines" v-model="entityModel.tagLineList" required></b-form-input>
        </b-input-group>

        <label class="sr-only" id="input-label-analytics-html" for="input-analytics-html">HTML</label>
        <b-input-group class="my-2" prepend="HTML">
          <b-form-input id="input-analytics-html" v-model="entityModel.html" required></b-form-input>
        </b-input-group>

        <b-card header="Preview">{{ entityModel.html }}</b-card>

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
export default class TeamForm extends EntityForm {}
</script>

<style lang="scss"></style>
