<template>
  <b-navbar variant="dark" type="dark" fixed="top">
    <b-navbar-brand to="index">STRUDEL</b-navbar-brand>
    <b-navbar-nav>
      <b-nav-item to="users">Users</b-nav-item>
      <b-nav-item to="teams">Teams</b-nav-item>
      <b-nav-item to="fixtures">Fixtures</b-nav-item>
      <b-nav-item to="predictions">Predictions</b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Header extends Vue {}
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
