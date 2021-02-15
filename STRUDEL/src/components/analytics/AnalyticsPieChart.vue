<template>
  <b-card no-body class="overflow-hidden shadow" style="max-width: 540px;">
    <b-row no-gutters>
      <b-col md="6">
        <b-card-body :title="title">
          <b-card-text>
            {{ text }}
            <p v-for="item in data" :key="item.text">{{ item.text }} : {{ item.percentage * 100 }}%</p>
          </b-card-text>
        </b-card-body>
      </b-col>
      <b-col md="6">
        <b-card-img src="https://picsum.photos/400/400/?image=20" alt="Image" class="rounded-0"></b-card-img>
      </b-col>
    </b-row>
  </b-card>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component, Prop } from "vue-property-decorator";
import { BaseComponent } from "../BaseComponent";

export type AnalyticsPieChartDataItem = {
  colour: string;
  percentage: number;
  text: string;
};

@Component
export default class AnalyticsPieChart extends BaseComponent {
  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  text!: string;

  @Prop({ required: true })
  data!: Array<AnalyticsPieChartDataItem> | null;

  // handleFrameExpand(entity: AnalyticsItem) {
  //   entity._expanded = !entity._expanded;
  //   const element = document.getElementById(`analytics-iframe-${entity.id}`) as HTMLIFrameElement;
  //   this.resizeIframe(element);
  // }

  // handleIFrameLoad(event: Event) {
  //   this.resizeIframe(event.target as HTMLIFrameElement);
  // }

  // resizeIframe(iframe: HTMLIFrameElement) {
  //   console.log("resize");
  //   iframe.style.height = iframe?.contentWindow?.document.documentElement.scrollHeight + "px";
  // }
}
</script>

<style scoped lang="scss"></style>
