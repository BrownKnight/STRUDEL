<template>
  <UserForm
    @submit="saveUser"
    saveButtonText="Update Details"
    :showForm="true"
    :entity="user"
    :personalMode="true"
  ></UserForm>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component } from "vue-property-decorator";
import UserForm from "@/components/entity-forms/UserForm.vue";
import { BaseComponent } from "@/components/BaseComponent";
import { UserLogin } from "@/ENKEL/entity/UserLogin";

@Component({
  components: { UserForm }
})
export default class UpdateUser extends BaseComponent {
  user: UserLogin | null = null;
  apiEndpoint = "/iapi/users";

  saveUser() {
    this.callENKEL(this.apiEndpoint, "PUT", JSON.stringify(this.user)).then(res => {
      res = res as Response;
      if (!res.ok) {
        console.log("Entity Save Error :(");
        console.log(res);
        res.text().then(text => console.error(text));
        this.showMessage({ delay: 10, message: "Error Updating User", variant: "danger" });
      } else {
        console.log("Entity Save Succeeded!");
        console.log(res);
        res.text().then(text => console.log(text));
        this.showMessage({ delay: 3, message: "User Updated", variant: "success" });
      }
    });
  }

  async created() {
    await this.getUser();
  }

  async getUser() {
    this.user = await this.callENKEL(`${this.apiEndpoint}/${this.$store?.state?.AuthModule?.user.id}`)
      .then(res => res.json())
      .then(json => json.entity);
  }
}
</script>

<style lang="scss"></style>
