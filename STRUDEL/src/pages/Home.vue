<template>
  <div id="hey">
    <p>Home! WIP</p>
    <PredictionEntry />
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component, Vue } from "vue-property-decorator";
import PredictionEntry from "@/components/PredictionEntry.vue";

@Component({
  components: { PredictionEntry }
})
export default class Home extends Vue {}
</script>

<style lang="scss"></style>
