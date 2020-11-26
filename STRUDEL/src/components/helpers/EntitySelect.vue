<template>
  <b-form-select :id="id" v-model="nestedValue" required :options="options"></b-form-select>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component, Prop, Watch } from "vue-property-decorator";
import { BaseComponent } from "@/components/BaseComponent.ts";
import { AnyEntity } from "@/ENKEL/entity/EntityHelper";

@Component({
  components: {}
})
export default class EntitySelect extends BaseComponent {
  @Prop()
  id: string | undefined;

  @Prop()
  value: string | undefined;

  @Prop()
  optionsEndpoint: string | undefined;

  @Prop()
  optionTextFunction: ((entity: AnyEntity) => string) | undefined;

  options: Array<{ value: string; text: string }> = [];

  get nestedValue() {
    return this.value;
  }

  set nestedValue(nestedValue) {
    this.$emit("input", nestedValue);
  }

  @Watch("optionsEndpoint")
  loadOptionList() {
    if (this.optionsEndpoint) {
      this.callENKEL(this.optionsEndpoint)
        .then(res => res.json())
        .then((entites: AnyEntity[]) => {
          this.options = entites.map(entity => {
            let optionText = entity.id?.toString() as string;
            if (this.optionTextFunction) {
              optionText = this.optionTextFunction(entity);
            }

            let value = entity.id?.toString();
            if (!value) {
              value = entity as string;
            }

            return { value: value as string, text: optionText };
          });
        });
    }
  }

  created() {
    this.loadOptionList();
  }
}
</script>

<style lang="scss"></style>
