<template>
  <b-navbar variant="dark" type="dark" fixed="top" v-bindsticky=true>
    <b-navbar-brand to="index">STRUDEL</b-navbar-brand>
    <b-navbar-nav>
      <b-nav-item to="users">Users</b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Header extends Vue {
  // @Prop() private msg!: string;
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
