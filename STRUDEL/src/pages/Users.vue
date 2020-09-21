<template>
  <div id="users-page">
    <h3>Maintain Users</h3>
    <EntityManagement
      v-bind:apiEndpoint="'/iapi/users'"
      :entityFormComponent="UserForm"
      :fields="fields"
    ></EntityManagement>
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component, Vue } from "vue-property-decorator";
import EntityManagement from "@/components/EntityManagement.vue";
import UserForm from "@/components/entity-forms/UserForm.vue";

@Component({
  components: { EntityManagement, UserForm }
})
export default class Users extends Vue {
  UserForm = UserForm;

  fields = [
    { key: "id", sortable: true, label: "id" },
    { key: "emailAddress", label: "Email Address", sortable: true },
    { key: "fullName", sortable: true, label: "Name" },
    { key: "Action" }
  ];
}
</script>

<style lang="scss"></style>
