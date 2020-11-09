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
import { Component, Prop, Watch, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class DatePicker extends Vue {
  @Prop()
  id: string | undefined;

  @Prop()
  value: string | undefined;

  @Watch("value")
  valueChanged() {
    this.$emit("input", this.value);
  }

  hasNativeDatePicker() {
    const el = document.createElement("input");
    const invalidVal = "foo"; // Any value that is not a date
    el.setAttribute("type", "date");
    el.setAttribute("value", invalidVal);
    // A supported browser will modify this if it is a true date field
    return el.value !== invalidVal;
  }
}
</script>

<style lang="scss"></style>
