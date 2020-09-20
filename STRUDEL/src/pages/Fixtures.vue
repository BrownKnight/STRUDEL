<template>
  <div id="hey">
    <p>Welcome to the Fixtures!</p>
    <b-table striped :items="fixtureList"></b-table>
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class Fixtures extends Vue {
  fixtureList = [];

  async getUserList() {
    return await fetch("/iapi/fixtures")
      .then(res => res.json())
      .then(json => {
        this.fixtureList = json;
      });
  }

  async created() {
    this.getUserList();
  }
}
</script>

<style lang="scss"></style>
