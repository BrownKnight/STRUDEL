<template>
  <b-card>
    <b-row class="mb-2">
      <b-col cols="12" class="text-center"><b>Predictions:</b></b-col>
    </b-row>
    <b-card-group columns>
      <b-card
        class="shadow"
        no-body
        v-for="prediction in data.item.predictions"
        :key="prediction.id"
        :border-variant="
          data.item.fixtureResult ? (data.item.fixtureResult === prediction.prediction ? 'success' : 'danger') : null
        "
      >
        <b-card-body class="p-1">
          <span class="font-weight-bold mr-2">{{ prediction.user.fullName }}</span>
          <span>{{ formatFixtureResult(prediction.prediction) }}</span>
        </b-card-body>
      </b-card>
    </b-card-group>
  </b-card>
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
