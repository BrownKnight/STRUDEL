<template>
  <div id="users-page">
    <b-row>
      <h3 class="my-5 mx-3">System Management</h3>
    </b-row>
    <b-row>
      <b-col cols="12" md="6" offset-md="3">
        <b-list-group>
          <b-list-group-item button v-b-toggle.generate-predictions-for-user variant="light">
            <span>Generate Predictions for a User</span>
          </b-list-group-item>
          <b-collapse id="generate-predictions-for-user">
            <b-list-group-item>
              <b-row>
                <b-col cols="12" md="6">
                  <b-input-group prepend="User">
                    <b-form-select v-model="selectedUserId" :options="userOptions"></b-form-select>
                  </b-input-group>
                </b-col>
                <b-col cols="12" md="6">
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
                <b-col cols="12">
                  <b-button variant="success" size="sm" class="mt-2" @click="generatePredictionsForUser()">
                    Generate Empty Predictions
                  </b-button>
                </b-col>
              </b-row>
            </b-list-group-item>
          </b-collapse>
        </b-list-group>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { BaseComponent } from "@/components/BaseComponent";
import { UserLogin } from "@/ENKEL/entity/UserLogin";
import moment from "moment";
import "reflect-metadata";
import { Component } from "vue-property-decorator";

@Component({
  components: {}
})
export default class Management extends BaseComponent {
  selectedUserId = "";
  userOptions = [];
  date = moment().format("YYYY-MM-DD");

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
