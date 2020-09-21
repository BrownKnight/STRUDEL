<template>
  <div id="user-form">
    <b-row align-h="center">
      <b-form v-if="entityModel != null && showForm" @submit.prevent="emitSubmitEvent">
        <label class="sr-only" id="input-label-user-id" for="input-user-id">User ID</label>
        <b-input-group class="mr-2 my-3" prepend="User ID">
          <b-form-input id="input-user-id" v-model.number="entityModel.id" disabled></b-form-input>
        </b-input-group>

        <label class="sr-only" id="input-label-user-name" for="input-user-name">Name</label>
        <b-input-group class="my-3" prepend="Name">
          <b-form-input id="input-user-name" v-model="entityModel.fullName" required></b-form-input>
        </b-input-group>

        <label class="sr-only" id="input-label-email-address" for="input-email-address">Email Address</label>
        <b-input-group class="my-3" prepend="Email Address">
          <b-form-input id="input-email-address" v-model.number="entityModel.emailAddress" required></b-form-input>
        </b-input-group>

        <label class="sr-only" id="input-label-password" for="input-password">Password</label>
        <b-input-group class="my-3" prepend="Password">
          <b-form-input
            id="input-password"
            v-model.number="entityModel.password"
            required
            :disabled="!entityModel.new"
            type="password"
          ></b-form-input>
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

@Component({
  components: {}
})
export default class UserForm extends EntityForm {}
</script>

<style lang="scss"></style>
