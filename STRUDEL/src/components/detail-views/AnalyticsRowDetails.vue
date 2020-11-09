<template>
  <b-card>
    <b-card class="shadow">
      <div class="iframe-container">
        <iframe :srcdoc="data.item.html" frameborder="0"></iframe>
      </div>
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
