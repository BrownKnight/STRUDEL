import "reflect-metadata";
import { Prop, Watch } from "vue-property-decorator";
import { BaseComponent } from "@/components/BaseComponent.ts";

export class EntityForm extends BaseComponent {
  @Prop()
  entity: unknown;
  @Prop()
  showForm: boolean | undefined;

  entityModel: unknown = null;

  @Watch("entity")
  setEntityModel(value: unknown) {
    if (value === {} || (value as Record<string, unknown>).new) {
      value = this.createNewEntityModel(value);
    }
    this.entityModel = value;
  }

  createNewEntityModel(value: unknown): unknown {
    return value;
  }

  emitSubmitEvent() {
    this.$emit("submit");
    if (this.formSubmitted) {
      this.formSubmitted();
    }
  }

  protected formSubmitted?(): void;
}
