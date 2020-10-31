<template>
  <div id="analytics-items-list">
    <template v-for="entity in entityList">
      <b-card class="shadow mt-3" :key="entity.id">
        <h3>{{ entity.heading }}</h3>
        <b-container>
          <div class="iframe-container">
            <iframe :srcdoc="entity.html" frameborder="0"></iframe>
          </div>
        </b-container>
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

<style scoped lang="scss">
.iframe-container {
  overflow: hidden;
  /* 16:9 aspect ratio */
  padding-top: 56.25%;
  position: relative;
}

.iframe-container iframe {
  border: 0;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}
</style>
