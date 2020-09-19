<template>
  <div id="user-form">
    <p>{{ entityModel }}</p>

    <b-form v-if="entityModel != null">
      <b-form-group id="input-label-user-id" label="User ID" label-for="input-user=id">
        <b-form-input id="input-user-id" v-model="entityModel.id" required></b-form-input>
      </b-form-group>
      <b-form-group id="input-label-user-email-address" label="Email Address" label-for="input-user-email-address">
        <b-form-input
          id="input-user-email-address"
          v-model="entityModel.emailAddress"
          type="email"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-label-user-password" label="Password" label-for="input-user-password">
        <b-form-input id="input-user-password" v-model="entityModel.password" type="password" required></b-form-input>
      </b-form-group>
      <b-button variant="success" v-on:click="submitEntity()">Save Entity</b-button>
    </b-form>

    <b-alert v-model="showSuccessResponseInfo" variant="success" dismissible>Entity Saved!</b-alert>
    <b-alert v-model="showErrorResponseInfo" variant="danger" dismissible>Entity Save Error</b-alert>
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component({
  components: {}
})
export default class UserForm extends Vue {
  @Prop()
  entity = null;

  // apiEndpoint = "/iapi/users";
  entityModel = null;
  showSuccessResponseInfo = false;
  showErrorResponseInfo = false;

  @Watch("entity")
  setEntityModel(value) {
    this.entityModel = value;
  }

  submitEntity() {
    fetch(`/iapi/users`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.entityModel)
    })
      .catch(error => {
        console.log("User Entity Save Failed!");
        console.log(error);
      })
      .then(res => {
        if (!res.ok) {
          console.log("User Entity Save Error!");
          console.log(res);
          this.showErrorResponseInfo = true;
        } else {
          console.log("User Entity Save Succeeded!");
          console.log(res);
          this.entityModel = null;
          this.showSuccessResponseInfo = true;
        }
      });
  }

  // @Prop()
  // userId: number | null = null;

  // async getEntity(apiEndpoint: string) {
  //   return await fetch(apiEndpoint)
  //     .then(res => res.json())
  //     .then(json => {
  //       this.entity = json;
  //     });
  // }

  // @Watch("userId")
  // async onUserChanged(value: number) {
  //   console.log("userIdChanged");
  //   const apiUrl = `${this.apiEndpoint}/${value}`;
  //   this.entity = this.getEntity(apiUrl);
  // }
}
</script>

<style lang="scss"></style>
