import { Schedule } from "../../../STRUDAL/entity/Schedule.js";
import { ScheduleDAO } from "../../../STRUDAL/DAO/ScheduleDAO.js";
import { BasicEntityOperationHandler } from "../basicEntityOperationHandler.js";
import { ScheduleJobs } from "./scheduleJobs.js";
import schedule from "node-schedule";

export class ScheduleHandler extends BasicEntityOperationHandler<Schedule> {
  constructor() {
    super(new ScheduleDAO());
  }

  getJobList(): string[] {
    return Object.keys(ScheduleJobs);
  }

  async refreshSchedule(): Promise<void> {
    // Cancel all current jobs
    for (const scheduledJobName of Object.keys(schedule.scheduledJobs)) {
      console.log(`Cancelling schedule job: ${scheduledJobName}}`);
      schedule.cancelJob(scheduledJobName);
    }

    const jobs: Schedule[] = await this.getAllEntities();
    jobs.forEach((job) => {
      schedule.scheduleJob(job.name, job.cron, ScheduleJobs[job.jobName].action);
    });
  }
}
