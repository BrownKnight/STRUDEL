<template>
  <div id="entity-management">
    <p v-if="entityList == []">Loading...</p>
    <b-table striped :items="entityList" :fields="fields" show-empty>
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
    ></component>

    <b-alert v-model="showSuccessResponseInfo" variant="success" dismissible>Entity Saved!</b-alert>
    <b-alert v-model="showErrorResponseInfo" variant="danger" dismissible>Entity Save Error</b-alert>
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class EntityManagement extends Vue {
  entityList: string[] = [];
  fields: string[] = [];

  showSuccessResponseInfo = false;
  showErrorResponseInfo = false;
  showForm = false;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formEntity: any = {};

  @Prop()
  apiEndpoint: string | undefined;

  @Prop()
  entityFormComponent: Vue | undefined;

  async getAllEntities(apiEndpoint: string) {
    return await fetch(apiEndpoint)
      .then(res => res.json())
      .then(json => {
        this.entityList = json;
        if (this.entityList.length > 0) {
          // TODO: Make this a list of objects that allow for sorting of certain columns
          this.fields = Object.getOwnPropertyNames(this.entityList[0])
            .filter(e => e != "__ob__")
            .sort();
          this.fields.push("Action");
        } else {
          this.fields = [];
        }
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
    this.showSuccessResponseInfo = false;
    this.showErrorResponseInfo = false;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deleteEntity(entity: any) {
    // TODO: not this
    console.log(`Deleting entity with id ${entity.id}`);
    this.handleDeleteEntity(entity);
    this.formEntity = entity;
    this.showForm = false;
    this.showSuccessResponseInfo = false;
    this.showErrorResponseInfo = false;
  }

  createNewEntity() {
    console.log("New Entity Creation requested");
    this.formEntity = { new: true };
    this.showForm = true;
    this.showSuccessResponseInfo = false;
    this.showErrorResponseInfo = false;
  }

  handleFormSubmit() {
    console.log("form submitted and being handled");
    if (!this.apiEndpoint) {
      console.error("No apiendpoint set");
      return;
    }
    fetch(this.apiEndpoint, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.formEntity)
    })
      .catch(error => {
        console.log("Entity Save Failed!");
        console.log(error);
      })
      .then(res => {
        res = res as Response;
        if (!res.ok) {
          console.log("Entity Save Error :(");
          console.log(res);
          res.text().then(text => console.error(text));
          this.showErrorResponseInfo = true;
        } else {
          console.log("Entity Save Succeeded!");
          console.log(res);
          res.text().then(text => console.log(text));
          if (this.formEntity.new && this.apiEndpoint) {
            this.getAllEntities(this.apiEndpoint);
          }
          this.formEntity = {};
          this.showSuccessResponseInfo = true;
          this.showErrorResponseInfo = false;
          this.showForm = false;
        }
      });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleDeleteEntity(entity: any) {
    if (!this.apiEndpoint) {
      console.error("No apiendpoint set");
      return;
    }
    if (entity && entity.id) {
      fetch(`${this.apiEndpoint}/${entity.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      })
        .catch(error => {
          console.log("Entity Deletion Failed!");
          console.log(error);
        })
        .then(res => {
          res = res as Response;
          if (!res.ok) {
            console.log("Entity Deletion Error :(");
            console.log(res);
            res.text().then(text => console.error(text));
            this.showErrorResponseInfo = true;
          } else {
            console.log("Entity Deletion Succeeded!");
            console.log(res);
            res.text().then(text => console.log(text));
            if (this.formEntity.new && this.apiEndpoint) {
              this.getAllEntities(this.apiEndpoint);
            }
            this.formEntity = {};
            this.showSuccessResponseInfo = true;
            this.showErrorResponseInfo = false;
            this.showForm = false;
          }
        });
    }
  }
}
</script>

<style lang="scss"></style>
