import "reflect-metadata";
import { Prop, Vue, Watch } from "vue-property-decorator";

export class EntityForm extends Vue {
  @Prop()
  entity: unknown;
  @Prop()
  showForm: boolean | undefined;

  entityModel: unknown = null;
  showSuccessResponseInfo = false;
  showErrorResponseInfo = false;

  @Watch("entity")
  setEntityModel(value: unknown) {
    this.entityModel = value;
  }

  emitSubmitEvent() {
    this.$emit("submit");
  }
}
