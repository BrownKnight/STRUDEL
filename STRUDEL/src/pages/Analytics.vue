<template>
  <div id="hey">
    <b-row>
      <h3 class="my-5 mx-3">Analytics</h3>
    </b-row>
    <AnalyticsItems />
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component, Vue } from "vue-property-decorator";
import AnalyticsItems from "@/components/AnalyticsItems.vue";

@Component({
  components: { AnalyticsItems }
})
export default class Analytics extends Vue {}
</script>

<style lang="scss"></style>
