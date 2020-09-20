<template>
  <div id="user-form">
    <b-form v-if="entityModel != null && showForm">
      <b-form-group id="input-label-user-id" label="User ID" label-for="input-user=id">
        <b-form-input id="input-user-id" v-model="entityModel.id" required :disabled="!entityModel.new"></b-form-input>
      </b-form-group>
      <b-form-group id="input-label-user-email-address" label="Email Address" label-for="input-user-email-address">
        <b-form-input
          id="input-user-email-address"
          v-model="entityModel.emailAddress"
          type="email"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-label-user-password" label="Password" label-for="input-user-password">
        <b-form-input id="input-user-password" v-model="entityModel.password" type="password" required></b-form-input>
      </b-form-group>
      <b-button variant="success" v-on:click="submitEntity()">Save Entity</b-button>
    </b-form>

    <b-alert v-model="showSuccessResponseInfo" variant="success" dismissible>Entity Saved!</b-alert>
    <b-alert v-model="showErrorResponseInfo" variant="danger" dismissible>Entity Save Error</b-alert>
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component } from "vue-property-decorator";
import { EntityForm } from "@/components/entity-forms/EntityForm.ts";

@Component({
  components: {}
})
export default class UserForm extends EntityForm {}
</script>

<style lang="scss"></style>
