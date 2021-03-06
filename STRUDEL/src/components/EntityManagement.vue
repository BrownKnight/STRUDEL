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
      small
    >
      <template v-slot:cell(expand)="data">
        <b-button size="sm" variant="outline-info" v-on:click="data.toggleDetails">
          <b-icon icon="chevron-down" class="align-middle" :rotate="data.detailsShowing ? 180 : 0"></b-icon>
        </b-button>
      </template>

      <template v-slot:cell(Action)="data">
        <b-button size="sm" variant="success" v-on:click="editEntity(data.item)">
          <b-icon icon="pencil"></b-icon>
        </b-button>
        <b-button size="sm" variant="danger" v-on:click="deleteEntity(data.item)" class="ml-2">
          <b-icon icon="x"></b-icon>
        </b-button>
      </template>

      <template v-slot:cell(fixtureHomeTeam)="data">
        <div class="w-100 justify-content-start justify-content-md-end d-flex align-items-center text-right">
          <span class="order-sm-1 order-2"> {{ data.item.homeTeam.teamName }}</span>
          <img class="mx-2 order-sm-2 order-1" :src="data.item.homeTeam.teamLogoUrl" style="height: 2em;" />
        </div>
      </template>
      <template v-slot:cell(fixtureAwayTeam)="data">
        <div class="w-100 justify-content-start d-flex align-items-center text-left">
          <span class="order-2"> {{ data.item.awayTeam.teamName }}</span>
          <img class="mx-2 order-1" :src="data.item.awayTeam.teamLogoUrl" style="height: 2em;" />
        </div>
      </template>
      <template v-slot:row-details="data">
        <component :is="rowDetailsComponent" :data="data" />
      </template>
    </b-table>

    <b-row>
      <b-col cols="4" offset="4">
        <b-button v-if="this.isAdmin()" size="sm" variant="outline-success" v-on:click="createNewEntity()">
          Create New
        </b-button>
      </b-col>

      <b-col cols="4">
        <b-button
          v-if="fields.some(field => field.key === 'expand')"
          size="sm"
          variant="outline-info"
          v-on:click="toggleAllRows()"
        >
          Toggle All
        </b-button>
      </b-col>
    </b-row>

    <component
      :is="entityFormComponent"
      :entity="formEntity"
      :showForm="showForm"
      @submit="handleFormSubmit"
      class="mt-2"
      id="entity-form"
    ></component>
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { BaseComponent, BootstrapTableField, FormEntity } from "@/components/BaseComponent.ts";
import { AnyEntity } from "@/ENKEL/entity/EntityHelper";

const SHOW_ALERT_TIME = 2;

@Component({
  components: {}
})
export default class EntityManagement extends BaseComponent {
  entityList: Array<AnyEntity & { _showDetails: boolean }> = [];

  showForm = false;

  formEntity: Partial<FormEntity> = {};

  @Prop()
  apiEndpoint: string | undefined;
  @Prop()
  GETextension: string | undefined;
  @Prop()
  entityFormComponent: Vue | undefined;
  @Prop()
  rowDetailsComponent: Vue | undefined;
  @Prop()
  fields: Array<BootstrapTableField> | undefined;
  @Prop()
  populateNewEntity: Function | undefined;

  async getAllEntities(apiEndpoint: string) {
    let endpoint = apiEndpoint;
    if (this.GETextension) {
      endpoint += this.GETextension;
    }

    return await this.callENKEL(endpoint)
      .then(res => res.json())
      .then(json => {
        json.forEach((entity: AnyEntity & { _showDetails: boolean }) => {
          entity._showDetails = false;
        });
        this.entityList = json;
      });
  }

  async created() {
    if (this.apiEndpoint) {
      this.getAllEntities(this.apiEndpoint);
    }
  }

  @Watch("GETextension")
  endpointUpdated() {
    if (this.apiEndpoint) {
      this.getAllEntities(this.apiEndpoint);
    }
  }

  editEntity(entity: AnyEntity) {
    console.log(`Editing entity with id ${entity.id}`);
    this.formEntity = entity;
    this.showForm = true;
    
    document.getElementById("entity-form")?.scrollIntoView();
  }

  deleteEntity(entity: AnyEntity) {
    // TODO: not this
    console.log(`Deleting entity with id ${entity.id}`);
    this.handleDeleteEntity(entity);
    if (this.apiEndpoint) this.getAllEntities(this.apiEndpoint);
    this.showForm = false;
  }

  createNewEntity() {
    console.log("New Entity Creation requested");
    this.formEntity = { new: true };
    if (this.populateNewEntity) {
      this.populateNewEntity(this.formEntity);
    }
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
        this.showMessage({ delay: SHOW_ALERT_TIME, message: "Error Saving Entity", variant: "danger" });
      } else {
        console.log("Entity Save Succeeded!");
        console.log(res);
        res.text().then(text => console.log(text));
        if (this.formEntity.new && this.apiEndpoint) {
          this.getAllEntities(this.apiEndpoint);
        }
        this.formEntity = {};
        this.showMessage({ delay: SHOW_ALERT_TIME, message: "Entity Saved", variant: "success" });
        this.showForm = false;
      }
    });
  }

  handleDeleteEntity(entity: AnyEntity) {
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
          res
            .text()
            .then(text => JSON.parse(text))
            .then(errorJson => {
              console.error(errorJson);
              this.showMessage({
                delay: SHOW_ALERT_TIME * 2,
                message: `Entity Deletion Error  (${errorJson?.errorMessage?.detail ?? "Cannot find error message"})`,
                variant: "danger"
              });
            });
        } else {
          console.log("Entity Deletion Succeeded!");
          console.log(res);
          res.text().then(text => console.log(text));
          if (this.formEntity.new && this.apiEndpoint) {
            this.getAllEntities(this.apiEndpoint);
          }
          this.formEntity = {};
          this.showMessage({ delay: SHOW_ALERT_TIME, message: "Entity Deleted", variant: "success" });
          this.showForm = false;
        }
      });
    }
  }

  toggleAllRows() {
    this.entityList.forEach(entity => {
      entity._showDetails = !entity._showDetails;
    });
  }
}
</script>

<style lang="scss">
td {
  vertical-align: middle !important;
}
</style>
