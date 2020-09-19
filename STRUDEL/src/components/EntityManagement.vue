<template>
  <div id="entity-management">
    <p v-if="entityList == []">Loading...</p>
    <b-table striped :items="entityList" :fields="fields" show-empty small>
      <template v-slot:cell(Edit?)="data">
        <b-button size="sm" variant="outline-primary" v-on:click="emitEditEvent(data.item)">Edit</b-button>
      </template>
    </b-table>
    <p>{{ fields }}</p>
    <b-button size="sm" variant="outline-success" v-on:click="emitNewEntityEvent()">Create New</b-button>
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class EntityManagement extends Vue {
  entityList = [];
  fields = [];

  @Prop()
  apiEndpoint: string;

  @Prop()
  entityName: string;

  async getAllEntities(apiEndpoint: string) {
    return await fetch(apiEndpoint)
      .then(res => res.json())
      .then(json => {
        this.entityList = json;
        if (this.entityList.length > 0) {
          this.fields = Object.getOwnPropertyNames(this.entityList[0]).slice(1);
          this.fields.push("Edit?");
        } else {
          this.fields = [];
        }
      });
  }

  async created() {
    this.getAllEntities(this.apiEndpoint);
  }

  emitEditEvent(entity) {
    console.log(`Editing entity with id ${entity.id}`);
    this.$emit("edit-entity", entity);
  }

  emitNewEntityEvent() {
    console.log("New Entity Creation requested");
    this.$emit("edit-entity", {});
  }
}
</script>

<style lang="scss"></style>
