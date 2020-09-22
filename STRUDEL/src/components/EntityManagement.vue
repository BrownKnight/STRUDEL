<template>
  <div id="entity-management">
    <p v-if="entityList == []">Loading...</p>
    <b-table
      striped
      :items="entityList"
      :fields="fields"
      show-empty
      outline
      borderless
      head-variant="dark"
      stacked="sm"
    >
      <template v-slot:cell(Action)="data">
        <b-button size="sm" variant="outline-primary" v-on:click="editEntity(data.item)">Edit</b-button>
        <b-button size="sm" variant="outline-danger" v-on:click="deleteEntity(data.item)" class="ml-2">Delete</b-button>
      </template>
    </b-table>
    <b-button size="sm" variant="outline-success" v-on:click="createNewEntity()">Create New</b-button>

    <component
      :is="entityFormComponent"
      :entity="formEntity"
      :showForm="showForm"
      @submit="handleFormSubmit"
      class="mt-2"
    ></component>

    <b-alert :show="entityAlert.show" :variant="entityAlert.variant" dismissible fade @dismissed="entityAlert.show = 0">
      <span>{{ entityAlert.message }}</span>
    </b-alert>
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component, Prop, Vue } from "vue-property-decorator";
import { BaseComponent } from "@/components/BaseComponent.ts";

const SHOW_ALERT_TIME = 20;

@Component({
  components: {}
})
export default class EntityManagement extends BaseComponent {
  entityList: string[] = [];

  entityAlert = {};
  showForm = false;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formEntity: any = {};

  @Prop()
  apiEndpoint: string | undefined;
  @Prop()
  entityFormComponent: Vue | undefined;
  @Prop()
  fields: Record<string, unknown> | undefined;

  async getAllEntities(apiEndpoint: string) {
    return await this.callENKEL(apiEndpoint)
      .then(res => res.json())
      .then(json => {
        this.entityList = json;
      });
  }

  async created() {
    if (this.apiEndpoint) {
      this.getAllEntities(this.apiEndpoint);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  editEntity(entity: any) {
    console.log(`Editing entity with id ${entity.id}`);
    this.formEntity = entity;
    this.showForm = true;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deleteEntity(entity: any) {
    // TODO: not this
    console.log(`Deleting entity with id ${entity.id}`);
    this.handleDeleteEntity(entity);
    if (this.apiEndpoint) this.getAllEntities(this.apiEndpoint);
    this.showForm = false;
  }

  createNewEntity() {
    console.log("New Entity Creation requested");
    this.formEntity = { new: true };
    this.showForm = true;
  }

  handleFormSubmit() {
    console.log("form submitted and being handled");
    if (!this.apiEndpoint) {
      console.error("No apiendpoint set");
      return;
    }
    this.callENKEL(this.apiEndpoint, "PUT", JSON.stringify(this.formEntity)).then(res => {
      res = res as Response;
      if (!res.ok) {
        console.log("Entity Save Error :(");
        console.log(res);
        res.text().then(text => console.error(text));
        this.showEntityAlert(SHOW_ALERT_TIME, "Error Saving Entity", "danger");
      } else {
        console.log("Entity Save Succeeded!");
        console.log(res);
        res.text().then(text => console.log(text));
        if (this.formEntity.new && this.apiEndpoint) {
          this.getAllEntities(this.apiEndpoint);
        }
        this.formEntity = {};
        this.showEntityAlert(SHOW_ALERT_TIME, "Entity Saved", "success");
        this.showForm = false;
      }
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleDeleteEntity(entity: any) {
    console.log("deleting entity", entity);
    if (!this.apiEndpoint) {
      console.error("No apiendpoint set");
      return;
    }
    if (entity && entity.id) {
      this.callENKEL(`${this.apiEndpoint}/${entity.id}`, "DELETE", "").then(res => {
        res = res as Response;
        if (!res.ok) {
          console.log("Entity Deletion Error :(");
          console.log(res);
          res.text().then(text => console.error(text));
          this.showEntityAlert(SHOW_ALERT_TIME, "Entity Deletion Error", "danger");
        } else {
          console.log("Entity Deletion Succeeded!");
          console.log(res);
          res.text().then(text => console.log(text));
          if (this.formEntity.new && this.apiEndpoint) {
            this.getAllEntities(this.apiEndpoint);
          }
          this.formEntity = {};
          this.showEntityAlert(SHOW_ALERT_TIME, "Entity Deleted", "success");
          this.showForm = false;
        }
      });
    }
  }

  showEntityAlert(shownForTime: number, message: string, variant: string) {
    this.entityAlert = {
      show: shownForTime,
      message: message,
      variant: variant
    };
  }
}
</script>

<style lang="scss"></style>
