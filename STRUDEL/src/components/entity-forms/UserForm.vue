<template>
  <div id="user-form">
    <b-row align-h="center">
      <b-form v-if="entityModel != null && showForm" @submit.prevent="emitSubmitEvent">
        <b-input-group class="mr-2 my-3" prepend="User ID" v-if="isAdmin()">
          <label class="sr-only" id="input-label-user-id" for="input-user-id">User ID</label>
          <b-form-input id="input-user-id" v-model.number="entityModel.id" disabled></b-form-input>
        </b-input-group>

        <b-input-group class="my-3" prepend="Name">
          <label class="sr-only" id="input-label-user-name" for="input-user-name">Name</label>
          <b-form-input id="input-user-name" v-model="entityModel.fullName" required></b-form-input>
        </b-input-group>

        <b-input-group class="my-3" prepend="Email">
          <label class="sr-only" id="input-label-email-address" for="input-email-address">Email</label>
          <b-form-input
            id="input-email-address"
            v-model.number="entityModel.emailAddress"
            required
            autocomplete="username"
          ></b-form-input>
        </b-input-group>

        <b-input-group class="my-3" prepend="Password">
          <label class="sr-only" id="input-label-password" for="input-password">Password</label>
          <b-form-input
            id="input-password"
            v-model="entityModel.password"
            required
            :disabled="!entityModel.new && !showPasswordField"
            type="password"
            autocomplete="new-password"
          ></b-form-input>
          <b-input-group-append>
            <b-button
              variant="secondary"
              @click="showPasswordField = true"
              v-if="!entityModel.new && !showPasswordField"
              >Change Password</b-button
            >
          </b-input-group-append>
        </b-input-group>

        <b-input-group class="my-3" prepend="Role" v-if="isAdmin()">
          <label class="sr-only" id="input-label-password" for="input-password">Role</label>
          <b-form-select :options="userRoleOptions" v-model="entityModel.userRole" required></b-form-select>
        </b-input-group>

        <b-button class="ml-2 my-2" variant="success" type="submit">{{ saveButtonText }}</b-button>
      </b-form>
    </b-row>
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component, Prop } from "vue-property-decorator";
import { EntityForm } from "@/components/entity-forms/EntityForm.ts";

@Component({
  components: {}
})
export default class UserForm extends EntityForm {
  showPasswordField = false;
  userRoleOptions = [
    { value: null, text: "Roles", disabled: true },
    { value: "S", text: "Standard" },
    { value: "A", text: "Admin" }
  ];

  @Prop()
  saveButtonText!: string;

  created() {
    super.created();
    if (!this.saveButtonText) {
      this.saveButtonText = "Save Entity";
    }
  }

  // When the form is subbmited, reset the showPasswordField setting
  protected formSubmitted() {
    this.showPasswordField = false;
  }
}
</script>

<style lang="scss"></style>
