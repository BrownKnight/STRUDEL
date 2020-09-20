<template>
  <div id="users-page">
    <h3>Maintain Users</h3>
    <EntityManagement v-bind:apiEndpoint="'/iapi/users'" :entityFormComponent="UserForm"></EntityManagement>
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component, Prop, Vue } from "vue-property-decorator";
import EntityManagement from "@/components/EntityManagement.vue";
import UserForm from "@/components/entity-forms/UserForm.vue";

@Component({
  components: { EntityManagement, UserForm }
})
export default class Users extends Vue {
  UserForm = UserForm;
}
</script>

<style lang="scss"></style>
