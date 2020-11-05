<template>
  <b-container id="analytics-items-list" fluid class="px-0">
    <b-row>
      <template v-for="entity in entityList">
        <b-col cols="12" :lg="entity._expanded ? '12' : '6'" :key="entity.id">
          <div class="d-flex justify-content-between align-items-center my-3">
            <h4 class="text-left m-0">{{ entity.heading }}</h4>
            <b-link @click="handleFrameExpand(entity)">
              <b-icon :icon="entity._expanded ? 'dash' : 'plus'" font-scale="1.5" />
            </b-link>
          </div>
          <div class="border rounded-lg">
            <iframe
              :id="`analytics-iframe-${entity.id}`"
              :srcdoc="entity.html"
              frameborder="0"
              @load="handleIFrameLoad"
              width="100%"
            ></iframe>
          </div>
          <ul class="mt-3 text-left tag-line-list">
            <li v-for="tagLine in entity.tagLineList.split(',')" :key="tagLine">{{ tagLine.trim() }}</li>
          </ul>
          <hr class="m-0" />
        </b-col>
      </template>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component } from "vue-property-decorator";
import { BaseComponent } from "./BaseComponent";
import type { AnalyticsItems } from "@/ENKEL/entity/AnalyticsItems";

type AnalyticsItem = AnalyticsItems & {
  _expanded: boolean;
}

@Component({})
export default class AnalyticsItemsView extends BaseComponent {
  entityList: Array<AnalyticsItem> = [];

  created() {
    this.callENKEL("/iapi/analytics")
      .then(res => res.json())
      .then(json => {
        if (json !== null) {
          json.forEach((element: AnalyticsItem) => {
            element._expanded = false;
          });
          this.entityList = json;
        }
      });
  }

  handleFrameExpand(entity: AnalyticsItem) {
    entity._expanded = !entity._expanded;
    const element = document.getElementById(`analytics-iframe-${entity.id}`) as HTMLIFrameElement;
    this.resizeIframe(element);
  }

  handleIFrameLoad(event: Event) {
    this.resizeIframe(event.target as HTMLIFrameElement);
  }

  resizeIframe(iframe: HTMLIFrameElement) {
    console.log("resize");
    iframe.style.height = iframe?.contentWindow?.document.documentElement.scrollHeight + "px";
  }
}
</script>

<style scoped lang="scss">
.tag-line-list {
  padding-left: 1em;
}
.tag-line-list > li {
  list-style-type: circle;
  list-style-position: outside;
}
</style>
