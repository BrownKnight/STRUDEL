export class ScheduleJob {
  jobName: string;
  action: (date: Date) => void;

  constructor(jobName: string, action: (date: Date) => void) {
    this.jobName = jobName;
    this.action = action;
  }
}

export const ScheduleJobs: { [jobName: string]: ScheduleJob } = {
  updateTodaysFixtures: new ScheduleJob("updateTodaysFixtures", () => {
    console.log("Running updateTodaysFixtures");
  }),
};
