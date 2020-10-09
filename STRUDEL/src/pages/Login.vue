<template>
  <div id="login-page">
    <b-row align-h="center">
      <h3 class="my-5 mx-3">Welcome to STRUDEL</h3>
    </b-row>
    <b-row>
      <b-col cols="12" md="8" offset-md="2" lg="6" offset-lg="3" class="align-self-center">
        <b-card no-body class="shadow">
          <b-tabs pills card justified>
            <b-tab active>
              <template v-slot:title>
                <b-icon class="mr-2" icon="box-arrow-in-right" scale="1em"></b-icon>
                <span>Login</span>
              </template>
              <LoginForm @submit="handleLogin"></LoginForm>
            </b-tab>
            <b-tab>
              <template v-slot:title>
                <b-icon class="mr-2" icon="person-lines-fill" scale="1em"></b-icon>
                <span>Register</span>
              </template>

              <UserForm
                :entity="newEntity"
                :saveButtonText="'Register'"
                :showForm="true"
                @submit="handleFormSubmit"
              ></UserForm>
            </b-tab>
          </b-tabs>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component } from "vue-property-decorator";
import LoginForm from "@/components/LoginForm.vue";
import UserForm from "@/components/entity-forms/UserForm.vue";
import { BaseComponent, NewEntity } from "@/components/BaseComponent.ts";
import { UserLogin } from "@/ENKEL/entity/UserLogin";

@Component({
  components: { LoginForm, UserForm }
})
export default class Login extends BaseComponent {
  newEntity: Partial<UserLogin & NewEntity> = {};

  apiEndpoint = "/login/register";

  created() {
    this.newEntity = {
      new: true,
      // All new users are automatically standard users, only admins can change users to admins
      // This is also enforced on server-side
      userRole: "S"
    };
  }

  handleFormSubmit() {
    console.log("form submitted and being handled");
    if (!this.apiEndpoint) {
      console.error("No apiendpoint set");
      return;
    }
    this.callENKEL(this.apiEndpoint, "PUT", JSON.stringify(this.newEntity)).then(res => {
      res = res as Response;
      if (!res.ok) {
        console.log("Registration Error :(");
        console.log(res);
        res
          .text()
          .then(text => JSON.parse(text))
          .then(json => {
            console.error(json);
            this.showEntityAlert(5, `Registration Error :( ${json.errorMessage}`, "danger");
          });
      } else {
        console.log("Registration succeeded!");
        console.log(res);
        // if we register successfully, then we should log in with our new credentials
        if (this.newEntity.emailAddress && this.newEntity.password) {
          this.handleLogin(this.newEntity.emailAddress, this.newEntity.password);
        }
      }
    });
  }

  async handleLogin(emailAddress: string, password: string) {
    if (!emailAddress || !password) {
      this.showEntityAlert(5, "Please supply Email Address and Password", "danger");
      return;
    }

    const loginResult = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emailAddress: emailAddress, password: password })
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
          this.showEntityAlert(10, "Login Failed (No Token?)", "danger");
          return;
        }
      });
    } else {
      if (loginResult.status === 500) {
        this.showEntityAlert(10, "Login Failed (No Connection to ENKEL)", "danger");
      } else {
        this.showEntityAlert(10, "Login Failed", "danger");
      }
      return;
    }
  }
}
</script>

<style lang="scss">
.vh-50 {
  height: 50vh;
}
</style>
