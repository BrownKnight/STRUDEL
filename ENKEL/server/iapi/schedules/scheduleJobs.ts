import { oneDayReminderEmail, threeHourReminderEmail } from "./jobs/awsJobs.js";
import { lockThisWeeksFixtures, scheduleDynamicJobs, updateTodaysFixture } from "./jobs/ENKELJobs.js";
import { ScheduleJob } from "./jobs/scheduleJob.js";

export const ScheduleJobs: { [jobName: string]: ScheduleJob } = {
  // ENKEL
  updateTodaysFixtures: updateTodaysFixture,
  scheduleDynamicJobs: scheduleDynamicJobs,
  lockThisWeeksFixtures: lockThisWeeksFixtures,

  // AWS
  oneDayReminderEmail: oneDayReminderEmail,
  threeHourReminderEmail: threeHourReminderEmail,
};
