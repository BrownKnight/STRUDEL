import { Schedule } from "../../../STRUDAL/entity/Schedule.js";
import { ScheduleDAO } from "../../../STRUDAL/DAO/ScheduleDAO.js";
import { BasicEntityOperationHandler } from "../basicEntityOperationHandler.js";
import { ScheduleJobs } from "./scheduleJobs.js";
import schedule from "node-schedule";
import { EntityApiResponse } from "../apiResponse.js";
import { ScheduleType } from "../../../STRUDAL/entity/dataTypes/ScheduleType.js";
import { FixturesHandler } from "../fixtures/fixturesHandler.js";
import moment from "moment";

export class ScheduleHandler extends BasicEntityOperationHandler<Schedule> {
  constructor() {
    super(new ScheduleDAO());
  }

  getJobList(): string[] {
    return Object.keys(ScheduleJobs);
  }

  async refreshSchedule(): Promise<void> {
    console.log("** SCHEDULE REFRESH **");
    // Cancel all current jobs
    for (const scheduledJobName of Object.keys(schedule.scheduledJobs)) {
      console.log(`Cancelling schedule job: ${scheduledJobName}`);
      schedule.cancelJob(scheduledJobName);
    }

    const scheduleList: Schedule[] = await this.getAllEntities();
    scheduleList.forEach((job) => {
      const scheduledJob = schedule.scheduleJob(job.name, job.cron, ScheduleJobs[job.jobName].action);
      console.log(
        `Scheduling Job: ${job.name} to run ${job.jobName} at ${
          job.cron
        }. Next Run at: ${scheduledJob?.nextInvocation().toISOString()}`
      );
    });
  }

  async deleteAllDynamicJobs(): Promise<EntityApiResponse> {
    const response = new EntityApiResponse();

    const dynamicJobs = await this._DAO.getAllEntities({ where: { scheduleType: ScheduleType.DYNAMIC } });
    if (dynamicJobs == null || dynamicJobs.length === 0) {
      response.errorMessage = "Could not find any jobs to delete";
      return response;
    }

    dynamicJobs.forEach((job) => this._DAO.deleteEntity(job.id ?? 0));

    response.operationResult = `Deleted ${dynamicJobs.length} dynamic jobs`;

    return response;
  }

  async scheduleDynamicJobs(date: Date): Promise<EntityApiResponse> {
    const response = new EntityApiResponse();

    const fixtureHandler = new FixturesHandler();
    const fixtures = await fixtureHandler.getFixturesForCurrentWeek(date);

    if (fixtures == null || fixtures.length === 0) {
      response.errorMessage = `No fixtures found for this week`;
      return response;
    }

    // Fixtures returned are ordered by date, so first element will be the earliest
    const earliestFixtureTime = moment(fixtures[0].time, "HH:mm");
    const earliestFixtureDate = moment(fixtures[0].date).set({
      hour: earliestFixtureTime.get("hour"),
      minute: earliestFixtureTime.get("minute"),
    });
    const schedules: Partial<Schedule>[] = [];

    // Schedule job for 24h before the first fixture, to send a reminder
    schedules.push({
      name: "24h Prediction Reminder",
      cron: moment(earliestFixtureDate).add(-1, "day").toISOString(),
      jobName: "oneDayReminderEmail",
      scheduleType: ScheduleType.DYNAMIC,
    });

    // Schedule final reminder for 3h before the first fixture
    schedules.push({
      name: "3h Prediction Reminder",
      cron: moment(earliestFixtureDate).add(-3, "hour").toISOString(),
      jobName: "threeHourReminderEmail",
      scheduleType: ScheduleType.DYNAMIC,
    });

    // Lock the fixtures 1 hour before the first one
    schedules.push({
      name: "1h Fixture Lock",
      cron: moment(earliestFixtureDate).add(-1, "hour").toISOString(),
      jobName: "lockThisWeeksFixtures",
      scheduleType: ScheduleType.DYNAMIC,
    });

    await this._DAO.saveAll(schedules);

    await this.refreshSchedule();

    return response;
  }
}
