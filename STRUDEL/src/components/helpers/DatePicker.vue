<template>
  <b-form-input v-if="hasNativeDatePicker()" v-model="value" type="date" :id="id"></b-form-input>
  <b-form-datepicker
    v-else
    v-model="value"
    :id="id"
    :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
  ></b-form-datepicker>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component, Prop, Watch } from "vue-property-decorator";
import { BaseComponent } from "@/components/BaseComponent.ts";

@Component({
  components: {}
})
export default class DatePicker extends BaseComponent {
  @Prop()
  id: string | undefined;

  @Prop()
  value: string | undefined;

  @Watch("value")
  valueChanged() {
    this.$emit("input", this.value);
  }
}
</script>

<style lang="scss"></style>
