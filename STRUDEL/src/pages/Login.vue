<template>
  <div id="login-page">
    <h3>Login</h3>
    <LoginForm></LoginForm>
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

<style lang="scss"></style>
