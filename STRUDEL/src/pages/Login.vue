<template>
  <div id="login-page">
    <b-row class="vh-50">
      <b-col cols="12" md="4" offset-md="4" class="bg-dark align-self-center extra-rounded">
        <h3 class="mt-4 text-light">Login</h3>
        <LoginForm></LoginForm>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component, Vue } from "vue-property-decorator";
import LoginForm from "@/components/LoginForm.vue";

@Component({
  components: { LoginForm }
})
export default class Login extends Vue {}
</script>

<style lang="scss">
.vh-50 {
  height: 50vh;
}

.extra-rounded {
  border-radius: 1em;
}
</style>
