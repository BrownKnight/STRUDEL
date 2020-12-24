<template>
  <b-form-radio
    :class="`d-flex align-items-center justify-content-${reversed ? 'end' : 'start'}`"
    name="prediction"
    :value="value"
    class="px-0 py-1"
  >
    <img
      :src="team.teamLogoUrl"
      style="height: 2.25em; width: 2.25em;"
      :class="`mx-2 ${reversed ? 'order-3' : 'order-1'}`"
    />
    <span :class="reversed ? 'order-2' : 'order-2'">{{ team.teamCode }}</span>
    <div :class="`${reversed ? 'order-1 mr-1' : 'order-3 ml-1'} small`">
      <b-badge variant="success" v-show="showWin">WIN</b-badge>
    </div>
  </b-form-radio>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component, Prop } from "vue-property-decorator";
import { BaseComponent } from "@/components/BaseComponent.ts";
import type { Team } from "@/ENKEL/entity/Team";

@Component({
  components: {}
})
export default class TeamButton extends BaseComponent {
  @Prop({ required: true })
  team!: Team;

  @Prop({ required: true })
  value!: string;

  @Prop({ default: false })
  reversed!: boolean;

  @Prop({ default: false })
  showWin!: boolean;
}
</script>

<style lang="scss">
@use "sass:map";

.btn-prediction {
  border-color: transparent;
  // border-radius: 1em !important;
  border-width: 1px;
  color: #757674;
}

.btn-prediction.disabled {
  opacity: 1;
}

.btn-prediction.active {
  background-color: #f7f7f6;
  border-color: rgba(23, 22, 31, 0.2);
  border-width: 1px;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.125) !important;
  color: black;
}
.btn-prediction:hover:not(.disabled) {
  background-color: #f7f7f6;
  border-width: 1px;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.125) !important;
}
</style>
