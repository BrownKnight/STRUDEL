<template>
  <footer class="footer bg-light">
    <!-- <b-modal id="issue-modal" title="Report an issue" :aria-busy="true" hide-footer>
      <p>
        Found an issue? Please report it <a href="https://github.com/BrownKnight/STRUDEL/issues">here on GitHub</a>, so
        I can <em>professionally</em> ignore it.
      </p>
    </b-modal> -->

    <b-container>
      <b-button size="sm" variant="outline-primary" v-b-modal.issue-modal>
        <b-icon icon="bug" class="align-top"></b-icon> Found an issue?</b-button
      >
    </b-container>
  </footer>
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
.footer {
  height: 4em;
  line-height: 4em;
}
</style>
