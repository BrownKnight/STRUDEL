import { oneDayReminderEmail, threeHourReminderEmail } from "./jobs/awsJobs";
import { lockThisWeeksFixtures, scheduleDynamicJobs, updateTodaysFixture } from "./jobs/ENKELJobs";

export class ScheduleJob {
  jobName: string;
  action: (date: Date) => void;

  constructor(jobName: string, action: (date: Date) => void) {
    this.jobName = jobName;
    this.action = action;
  }
}

export const ScheduleJobs: { [jobName: string]: ScheduleJob } = {
  // ENKEL
  updateTodaysFixtures: updateTodaysFixture,
  scheduleDynamicJobs: scheduleDynamicJobs,
  lockThisWeeksFixtures: lockThisWeeksFixtures,

  // AWS
  oneDayReminderEmail: oneDayReminderEmail,
  threeHourReminderEmail: threeHourReminderEmail,
};
