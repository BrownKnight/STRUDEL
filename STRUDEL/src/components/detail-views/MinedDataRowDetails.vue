<template>
  <b-card>{{ data.item.json }}</b-card>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { BaseComponent } from "@/components/BaseComponent.ts";

@Component
export default class MinedDataRowDetails extends BaseComponent {
  @Prop()
  data: {} | undefined;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
