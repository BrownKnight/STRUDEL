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

  async login() {
    if (!this.emailAddress || !this.password) {
      this.showAlert(5, "Please supply Email Address and Password", "danger");
      return;
    }

    const loginResult = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emailAddress: this.emailAddress, password: this.password })
    });

    if (loginResult.ok) {
      loginResult.text().then(text => {
        const json = JSON.parse(text);
        const token = json["token"];
        if (token !== null && token !== "") {
          this.$store.commit("setToken", json["token"]);
          this.$router.push("/index");
          return;
        } else {
          this.showAlert(10, "Login Failed (No Token?)", "danger");
          return;
        }
      });
    } else {
      if (loginResult.status === 500) {
        this.showAlert(10, "Login Failed (No Connection to ENKEL)", "danger");
      } else {
        this.showAlert(10, "Login Failed", "danger");
      }
      return;
    }
  }

  showAlert(shownForTime: number, message: string, variant: string) {
    this.alert = {
      show: shownForTime,
      message: message,
      variant: variant
    };
  }
}
</script>

<style lang="scss"></style>
