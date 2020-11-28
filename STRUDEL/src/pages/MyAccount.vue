<template>
  <div id="users-page">
    <b-row>
      <h3 class="my-5 mx-3">My Account</h3>
    </b-row>
    <b-row>
      <b-col cols="12" md="8" offset-md="2" lg="6" offset-lg="3">
        <UpdateUser />
      </b-col>
    </b-row>
    <b-row>
      <h3 class="my-5 mx-3">My Predictive Performance</h3>
    </b-row>
    <b-row>
      <b-col>
        <small>Coming Soon...</small>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component } from "vue-property-decorator";
import UpdateUser from "@/components/UpdateUser.vue";
import { BaseComponent } from "@/components/BaseComponent";

@Component({
  components: { UpdateUser }
})
export default class MyAccount extends BaseComponent {}
</script>

<style lang="scss"></style>
