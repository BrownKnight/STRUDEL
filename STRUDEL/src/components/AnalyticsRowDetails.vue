<template>
  <b-card>
    <b-card class="shadow">
      <span v-html="data.item.html"></span>
    </b-card>
  </b-card>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { BaseComponent } from "@/components/BaseComponent.ts";

@Component
export default class AnalyticsRowDetails extends BaseComponent {
  @Prop()
  data: {} | undefined;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
