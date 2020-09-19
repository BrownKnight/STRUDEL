<template>
  <div id="hey">
    <p>Users</p>
    <EntityManagement @edit-entity="entity = $event" v-bind:apiEndpoint="'/iapi/users'"></EntityManagement>
    <UserForm v-bind:entity="entity"></UserForm>
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
  entity = null;
}
</script>

<style lang="scss"></style>
