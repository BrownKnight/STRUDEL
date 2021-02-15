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
      <b-col cols="12">
        <UserAnalyticsCards :userId="userId" />
      </b-col>
      <b-col>
        <small>
          Analytics are a work in progress!. Very open to suggestions on improving.
          <br />
          Simply use the <b>Found an issue</b> button below to send a suggestion.
          </small>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component } from "vue-property-decorator";
import UpdateUser from "@/components/UpdateUser.vue";
import UserAnalyticsCards from "@/components/analytics/UserAnalyticsCards.vue";
import { BaseComponent } from "@/components/BaseComponent";

@Component({
  components: { UpdateUser, UserAnalyticsCards }
})
export default class MyAccount extends BaseComponent {
  get userId() {
    return this.$store?.state?.AuthModule?.user.id;
  }
}
</script>

<style lang="scss"></style>
