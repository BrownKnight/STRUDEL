export class ScheduleJob {
  jobName: string;
  action: (date: Date) => void;

  constructor(jobName: string, action: (date: Date) => void) {
    this.jobName = jobName;
    this.action = action;
  }
}
