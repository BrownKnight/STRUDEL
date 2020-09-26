<template>
  <div id="hey">
    <b-row>
      <h3 class="my-5 mx-3">My Predictions</h3>
    </b-row>
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
