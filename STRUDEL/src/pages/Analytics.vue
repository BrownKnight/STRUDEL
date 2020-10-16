<template>
  <div id="hey">
    <b-row>
      <h3 class="my-5 mx-3">Analytics</h3>
    </b-row>
    <AnalyticsItemsView />
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component, Vue } from "vue-property-decorator";
import AnalyticsItemsView from "@/components/AnalyticsItemsView.vue";

@Component({
  components: { AnalyticsItemsView }
})
export default class Analytics extends Vue {}
</script>

<style lang="scss"></style>
