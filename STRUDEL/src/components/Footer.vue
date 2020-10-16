<template>
  <footer class="footer bg-light mt-5 container">
    <b-modal id="issue-modal" title="Report an issue" :aria-busy="true" hide-footer>
      <p>
        Found an issue? Please report it <a href="https://github.com/BrownKnight/STRUDEL/issues">here on GitHub</a>, so
        I can <em>professionally</em> ignore it.
      </p>
    </b-modal>

    <b-row class="px-0">
      <b-col cols="6" md="4" offset-md="4" class="text-left text-md-center">
        <b-button size="sm" variant="outline-primary" v-b-modal.issue-modal>
          <b-icon icon="bug" class="align-top mr-1"></b-icon>
          Found an issue?
        </b-button>
      </b-col>
      <b-col cols="6" md="3" class="text-right" v-if="isAdmin()">
        <b-button size="sm" variant="outline-primary" href="/api/docs">
          <b-icon icon="newspaper" class="align-top mr-1"></b-icon>
          API Docs
        </b-button>
      </b-col>
    </b-row>
  </footer>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { BaseComponent } from "./BaseComponent";

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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.footer {
  height: 4em;
  line-height: 4em;
}
</style>
