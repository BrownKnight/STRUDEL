<template>
  <div id="hey">
    <p>Welcome to the Users!</p>
    <b-table striped :items="userList"></b-table>
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class Users extends Vue {
  userList = [];

  async getUserList() {
    return await fetch("/iapi/users")
      .then(res => res.json())
      .then(json => {
        this.userList = json;
      });
  }

  async created() {
    this.getUserList();
  }
}
</script>

<style lang="scss"></style>
