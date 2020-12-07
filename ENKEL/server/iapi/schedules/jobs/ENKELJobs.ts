import { IApiFootballApiRouter } from "../../external/footballApi/router.js";
import { FixturesHandler } from "../../fixtures/fixturesHandler.js";
import { ScheduleHandler } from "../scheduleHandler.js";
import { ScheduleJob } from "./scheduleJob.js";

export const updateTodaysFixture = new ScheduleJob("updateTodaysFixtures", (date) => {
  console.log("Running updateTodaysFixtures");
  // Use the external football api endpoint
  const externalFootballApi = new IApiFootballApiRouter();
  externalFootballApi.updateFixtures(date.toISOString());
});

export const scheduleDynamicJobs = new ScheduleJob("scheduleDynamicJobs", async (date) => {
  console.log("Deleting this weeks dynamic jobs");

  const scheduleHandler = new ScheduleHandler();
  await scheduleHandler.deleteAllDynamicJobs();

  console.log("Scheduling new dynamic jobs");
  await scheduleHandler.scheduleDynamicJobs(date);
});

export const lockThisWeeksFixtures = new ScheduleJob("lockThisWeeksFixtures", async (date) => {
  console.log("Locking this week fixtures");

  const fixtureHandler = new FixturesHandler();
  const fixtures = await fixtureHandler.getFixturesForCurrentWeek(date);

  if (fixtures == null || fixtures.length === 0) {
    console.log(`No fixtures found for this week`);
    return;
  }

  const updatedFixtures = fixtures.map((fixture) => {
    return { id: fixture.id, locked: true };
  });

  const response = await fixtureHandler.saveMultipleEntities(updatedFixtures);
  console.log(response);
});
