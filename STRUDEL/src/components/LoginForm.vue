<template>
  <div id="login-form">
    <b-row align-h="center">
      <b-form @submit.prevent="login">
        <label class="sr-only" id="input-label-email" for="input-email">Email</label>
        <b-input-group class="mr-2 my-3" prepend="Email">
          <b-form-input
            id="input-email"
            v-model="emailAddress"
            type="email"
            required
            autocomplete="username"
            autofocus
          ></b-form-input>
        </b-input-group>

        <label class="sr-only" id="input-label-password" for="input-password">Password</label>
        <b-input-group class="mt-4 mb-3" prepend="Password">
          <b-form-input
            id="input-password"
            v-model="password"
            type="password"
            autocomplete="current-password"
            required
          ></b-form-input>
        </b-input-group>

        <b-button class="ml-2 my-2" variant="success" type="submit">Login</b-button>
      </b-form>
    </b-row>

    <b-row align-h="center" class="mt-3">
      <b-alert :show="alert.show" :variant="alert.variant" dismissible fade @dismissed="alert.show = 0">
        <span>{{ alert.message }}</span>
      </b-alert>
    </b-row>
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({
  components: {}
})
export default class LoginForm extends Vue {
  emailAddress: string | null = null;
  password: string | null = null;

  alert = {};

  login() {
    this.$emit("submit", this.emailAddress, this.password);
  }
}
</script>

<style lang="scss"></style>
