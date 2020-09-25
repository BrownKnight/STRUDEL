<template>
  <div id="login-page">
    <b-row align-h="center">
      <h3 class="my-5 mx-3">Welcome to STRUDEL</h3>
    </b-row>
    <b-row>
      <b-col cols="12" md="4" offset-md="4" class="align-self-center">
        <b-card no-body>
          <b-tabs pills card justified>
            <b-tab title="Login" active>
              <LoginForm></LoginForm>
            </b-tab>
            <b-tab title="Register">
              <UserForm :entity="newEntity" :saveButtonText="'Register'" :showForm="true"></UserForm>
            </b-tab>
          </b-tabs>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component, Vue } from "vue-property-decorator";
import LoginForm from "@/components/LoginForm.vue";
import UserForm from "@/components/entity-forms/UserForm.vue";

@Component({
  components: { LoginForm, UserForm }
})
export default class Login extends Vue {
  newEntity = {};

  created() {
    this.newEntity = {
      new: true,
      // All new users are automatically standard users, only admins can change users to admins
      userRole: "S"
    };
  }
}
</script>

<style lang="scss">
.vh-50 {
  height: 50vh;
}
</style>
