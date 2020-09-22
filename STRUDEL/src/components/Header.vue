<template>
  <b-navbar variant="dark" type="dark" fixed="top">
    <b-navbar-brand to="index">STRUDEL</b-navbar-brand>
    <b-navbar-nav v-if="isLoggedIn">
      <b-nav-item to="users">Users</b-nav-item>
      <b-nav-item to="teams">Teams</b-nav-item>
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
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Header extends Vue {
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
