<template>
  <b-row>
    <b-col>
      <AnalyticsPieChart
        title="This Week"
        text="Your predictive performance for the current week"
        :data="currentWeekUserPerformanceData"
      />
    </b-col>
    <b-col>
      <AnalyticsPieChart
        title="Last Week"
        text="Your predictive performance for last week"
        :data="lastWeekUserPerformanceData"
      />
    </b-col>
  </b-row>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component, Prop } from "vue-property-decorator";
import { BaseComponent } from "../BaseComponent";
import AnalyticsPieChart, { AnalyticsPieChartDataItem } from "./AnalyticsPieChart.vue";
import moment from "moment";

type UserAnalytics = {
  type: "Daterange" | "Matchweek";
  correctPredictions: number;
  incorrectPredictions: number;
  total: number;
  totalWithResults: number;
};

@Component({
  components: { AnalyticsPieChart }
})
export default class UserAnalyticsCards extends BaseComponent {
  @Prop({ required: true })
  userId!: number;

  currentWeekAnalytics: UserAnalytics | null = null;
  currentWeekUserPerformanceData: Array<AnalyticsPieChartDataItem> | null = null;

  lastWeekAnalytics: UserAnalytics | null = null;
  lastWeekUserPerformanceData: Array<AnalyticsPieChartDataItem> | null = null;

  async created() {
    const startDate = moment().startOf("week");
    const endDate = moment().endOf("week");

    await this.callENKEL(
      `/iapi/analytics/user/${this.userId}?startDate=${startDate.format("YYYY-MM-DD")}&endDate=${endDate.format(
        "YYYY-MM-DD"
      )}`
    )
      .then(res => res.json())
      .then(currentWeekResponse => {
        if (!currentWeekResponse.success) {
          this.showMessage({ message: "Error fetching analytics data", variant: "danger" });
          return;
        }

        this.currentWeekAnalytics = currentWeekResponse.entity;
      });

    await this.callENKEL(
      `/iapi/analytics/user/${this.userId}?startDate=${startDate
        .add(-1, "weeks")
        .format("YYYY-MM-DD")}&endDate=${endDate.add(-1, "weeks").format("YYYY-MM-DD")}`
    )
      .then(res => res.json())
      .then(lastWeekResponse => {
        if (!lastWeekResponse.success) {
          this.showMessage({ message: "Error fetching last weeks analytics data", variant: "danger" });
          return;
        }

        this.lastWeekAnalytics = lastWeekResponse.entity;
      });

    this.createUserPerformanceData();
  }

  private createUserPerformanceData() {
    if (this.currentWeekAnalytics) {
      this.currentWeekUserPerformanceData = [
        {
          colour: "green",
          percentage: this.currentWeekAnalytics.correctPredictions / this.currentWeekAnalytics.totalWithResults || 0,
          text: "Correct"
        },
        {
          colour: "red",
          percentage: this.currentWeekAnalytics.incorrectPredictions / this.currentWeekAnalytics.totalWithResults || 0,
          text: "Incorrect"
        }
      ];
    }

    if (this.lastWeekAnalytics) {
      this.lastWeekUserPerformanceData = [
        {
          colour: "green",
          percentage: this.lastWeekAnalytics.correctPredictions / this.lastWeekAnalytics.totalWithResults || 0,
          text: "Correct"
        },
        {
          colour: "red",
          percentage: this.lastWeekAnalytics.incorrectPredictions / this.lastWeekAnalytics.totalWithResults || 0,
          text: "Incorrect"
        }
      ];
    }
  }
}
</script>

<style scoped lang="scss"></style>
