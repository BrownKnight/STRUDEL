<template>
  <div id="hey">
    <b-row>
      <b-col cols="12" md="6">
        <h3 class="my-5 mb-1 text-left">Home</h3>
      </b-col>

      <b-col cols="12" md="3" offset-md="3" class="d-flex justify-content-md-end justify-content-center">
        <b-button class="mb-1 align-self-center" size="sm" variant="outline-info" to="/my-account">
          <span class="ml-1">My Predictive Performance</span>
          <b-icon class="ml-1 align-top" icon="box-arrow-up-right" scale="0.8"></b-icon>
        </b-button>
      </b-col>
    </b-row>
    <PredictionEntry />
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component, Vue } from "vue-property-decorator";
import PredictionEntry from "@/components/prediction-entry/PredictionEntry.vue";

@Component({
  components: { PredictionEntry }
})
export default class Home extends Vue {}
</script>

<style lang="scss"></style>
