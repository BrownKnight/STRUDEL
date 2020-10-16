<template>
  <div id="analytics-items-list">
    <template v-for="entity in entityList">
      <b-card class="shadow mt-3" :key="entity.id">
        <h3>{{ entity.heading }}</h3>
        <b-container v-html="entity.html"></b-container>
        <ul>
          <li v-for="tagLine in entity.tagLineList.split(',')" :key="tagLine">{{ tagLine }}</li>
        </ul>
      </b-card>
    </template>
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component } from "vue-property-decorator";
import { BaseComponent } from "./BaseComponent";
import { AnalyticsItems } from "@/ENKEL/entity/AnalyticsItems";

@Component({})
export default class AnalyticsItemsView extends BaseComponent {
  entityList: Array<AnalyticsItems> = [];

  created() {
    this.callENKEL("/iapi/analytics")
      .then(res => res.json())
      .then(json => {
        if (json !== null) {
          this.entityList = json;
        }
      });
  }
}
</script>

<style lang="scss"></style>
