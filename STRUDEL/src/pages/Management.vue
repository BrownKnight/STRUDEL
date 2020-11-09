<template>
  <div id="users-page">
    <b-row>
      <h3 class="my-5 mx-3">System Management</h3>
    </b-row>
    <b-row>
      <b-col cols="12" md="6" offset-md="3">
        <b-list-group>
          <b-list-group-item
            button
            @click="showGeneratePredictions = !showGeneratePredictions"
            :active="showGeneratePredictions"
            class="d-flex px-2"
          >
            <b-col cols="10" offset="1">
              <span>Generate Predictions for a User</span>
            </b-col>
            <b-col cols="1" class="">
              <b-icon :icon="showGeneratePredictions ? 'chevron-up' : 'chevron-down'" />
            </b-col>
          </b-list-group-item>
          <b-list-group-item v-if="showGeneratePredictions" class="px-3 pt-0">
            <b-row>
              <b-col cols="12" md="6" class="mt-3">
                <b-input-group prepend="User">
                  <b-form-select v-model="selectedUserId" :options="userOptions"></b-form-select>
                </b-input-group>
              </b-col>
              <b-col cols="12" md="6" class="mt-3">
                <b-input-group prepend="Date">
                  <b-form-input
                    v-if="hasNativeDatePicker()"
                    v-model="date"
                    type="date"
                    id="filter-end-date"
                  ></b-form-input>
                  <b-form-datepicker
                    v-else
                    v-model="date"
                    id="filter-end-date"
                    :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                  ></b-form-datepicker>
                </b-input-group>
              </b-col>
              <b-col cols="12" class="mt-2">
                <b-button variant="success" size="sm" @click="generatePredictionsForUser()">
                  Generate Empty Predictions
                </b-button>
              </b-col>
            </b-row>
          </b-list-group-item>

          <b-list-group-item to="maintain-analytics">
            <span>Manage Analytics Items</span>
          </b-list-group-item>
          <b-list-group-item to="maintain-fixtures">
            <span>Manage Fixtures</span>
          </b-list-group-item>
          <b-list-group-item to="maintain-mined-data">
            <span>Manage Mined Data</span>
          </b-list-group-item>

          <b-list-group-item
            button
            @click="showManageApple = !showManageApple"
            :active="showManageApple"
            class="d-flex px-2"
          >
            <b-col cols="10" offset="1">
              <span>APPLE</span>
            </b-col>
            <b-col cols="1" class="">
              <b-icon :icon="showManageApple ? 'chevron-up' : 'chevron-down'" />
            </b-col>
          </b-list-group-item>
          <b-list-group-item v-if="showManageApple">
            <APPLEManagement />
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { BaseComponent } from "@/components/BaseComponent";
import APPLEManagement from "@/components/APPLEManagement.vue";
import { UserLogin } from "@/ENKEL/entity/UserLogin";
import moment from "moment";
import "reflect-metadata";
import { Component } from "vue-property-decorator";

@Component({
  components: { APPLEManagement }
})
export default class Management extends BaseComponent {
  selectedUserId = "";
  userOptions: Array<{ value: number | null; text: string }> = [];
  date = moment().format("YYYY-MM-DD");

  showGeneratePredictions = false;
  showManageApple = false;

  created() {
    this.populateUserList();
  }

  populateUserList() {
    this.callENKEL("/iapi/users")
      .then(res => res.json())
      .then(json => {
        json = (json as Array<UserLogin>).sort((a, b) => a.fullName.localeCompare(b.fullName));

        this.userOptions = json.map((entity: UserLogin) => {
          return {
            value: entity.id,
            text: `${entity.fullName} (${entity.id})`
          };
        });
      });
  }

  generatePredictionsForUser() {
    const date = moment(this.date);
    this.callENKEL(
      `/iapi/users/${this.selectedUserId}/generate-predictions?startDate=${date.format(
        "YYYY-MM-DD"
      )}&endDate=${date.format("YYYY-MM-DD")}`,
      "POST"
    ).then(res => {
      if (res.status !== 200 && res.status !== 400) {
        this.showMessage({
          message: `Could not generate predictions (${res.status})`,
          variant: "danger",
          delay: 10000
        });
        return;
      }

      res
        .text()
        .then(text => JSON.parse(text))
        .then(json => {
          if (!json.success) {
            this.showMessage({
              message: `Could not generate predictions. API Response: ${json.errorMessage}`,
              variant: "danger"
            });
            return;
          }

          if (json.success) {
            this.showMessage({
              message: "Predictions Generated",
              variant: "success"
            });
            return;
          }
        });
    });
  }
}
</script>

<style lang="scss"></style>
