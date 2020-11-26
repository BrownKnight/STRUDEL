<template>
  <b-col v-if="isAdmin()">
    <b-input-group prepend="Update Fixtures on">
      <DatePicker id="import-date" v-model="importFixturesDate" />
      <b-input-group-append>
        <b-button variant="primary" @click="importFixtures()">Update</b-button>
      </b-input-group-append>
    </b-input-group>
  </b-col>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { BaseComponent } from "./BaseComponent";
import DatePicker from "@/components/helpers/DatePicker.vue";
import moment from "moment";

@Component({
  components: { DatePicker },
  inheritAttrs: true
})
export default class ImportFixtures extends BaseComponent {
  importFixturesDate = moment().format("YYYY-MM-DD");

  importFixtures() {
    if (this.importFixturesDate == null || this.importFixturesDate == "") {
      this.showMessage({ delay: 3, message: "Please enter a date to import fixtures for", variant: "danger" });
      return;
    }

    this.callENKEL(
      `/iapi/external/fixtures/importbydate?date=${moment(this.importFixturesDate).format("YYYY-MM-DD")}`,
      "POST"
    ).then(res => {
      res
        .text()
        .then(text => JSON.parse(text))
        .then(json => {
          if (!res.ok || !json.success) {
            this.showMessage({
              delay: 5,
              message: `Fixture import failed! ${json.errorMessage ??
                json.operationResult.message ??
                json.operationResult}`,
              variant: "danger"
            });

            return;
          }

          this.showMessage({
            delay: 3,
            message: `${json.entity.length} Fixtures imported!`,
            variant: "success"
          });
        });
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
