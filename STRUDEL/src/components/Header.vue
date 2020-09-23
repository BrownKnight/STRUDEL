<template>
  <b-navbar variant="dark" type="dark" fixed="top">
    <b-navbar-brand to="index">STRUDEL</b-navbar-brand>
    <b-navbar-nav v-if="isLoggedIn">
      <b-nav-item v-if="isAdmin()" to="users">Users</b-nav-item>
      <b-nav-item v-if="isAdmin()" to="teams">Teams</b-nav-item>
      <b-nav-item to="fixtures">Fixtures</b-nav-item>
      <b-nav-item to="predictions">Predictions</b-nav-item>
    </b-navbar-nav>

    <b-navbar-nav class="ml-auto">
      <b-nav-item-dropdown right :text="userFullName">
        <b-dropdown-item @click="invalidateToken()">Logout</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-navbar>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { BaseComponent } from "@/components/BaseComponent.ts";

@Component
export default class Header extends BaseComponent {
  get userFullName() {
    return this.$store.state?.AuthModule?.user?.fullName ?? "Not Logged In";
  }

  get isLoggedIn() {
    return this.$store.state?.AuthModule?.token !== null;
  }

  invalidateToken() {
    this.$store.commit("invalidateToken");
    this.$router.push("/login");
  }
}
</script>

<style scoped lang="scss"></style>
