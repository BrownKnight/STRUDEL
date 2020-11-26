import { IApiFootballApiRouter } from "../external/footballApi/router.js";

export class ScheduleJob {
  jobName: string;
  action: (date: Date) => void;

  constructor(jobName: string, action: (date: Date) => void) {
    this.jobName = jobName;
    this.action = action;
  }
}

export const ScheduleJobs: { [jobName: string]: ScheduleJob } = {
  updateTodaysFixtures: new ScheduleJob("updateTodaysFixtures", (date) => {
    console.log("Running updateTodaysFixtures");
    // Use the external football api endpoint
    const externalFootballApi = new IApiFootballApiRouter();
    externalFootballApi.updateFixtures(date.toISOString());
  }),
};
