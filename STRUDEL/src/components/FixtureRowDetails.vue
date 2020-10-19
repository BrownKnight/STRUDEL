<template>
  <b-row
    cols="2"
    :cols-md="data.item.predictions.length < 6 ? data.item.predictions.length : 6"
    class="justify-content-around"
    no-gutters
  >
    <b-col v-for="prediction in data.item.predictions" :key="prediction.id" class="pb-1 px-1">
      <b-card
        class="shadow-sm"
        no-body
        :key="prediction.id"
        :border-variant="
          data.item.fixtureResult ? (data.item.fixtureResult === prediction.prediction ? 'success' : 'danger') : null
        "
      >
        <b-card-body class="d-flex py-1 px-2 align-items-center justify-content-between">
          <span class="font-weight-bold mr-2">{{ prediction.user.fullName }}</span>
          <small>{{ formatFixtureResult(prediction.prediction) }}</small>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { BaseComponent } from "@/components/BaseComponent.ts";

@Component
export default class FixtureRowDetails extends BaseComponent {
  @Prop()
  data: {} | undefined;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
