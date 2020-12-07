import moment from "moment";
import { AWSHandler } from "../../external/aws/awsHandler.js";
import { FixturesHandler } from "../../fixtures/fixturesHandler.js";
import { PredictionsHandler } from "../../predictions/predictionsHandler.js";
import { UserLoginsHandler } from "../../users/userLoginsHandler.js";
import { ScheduleJob } from "./scheduleJob.js";

export const oneDayReminderEmail = new ScheduleJob("oneDayReminderEmail", async (date) => {
  console.log("Sending 24h reminder email");

  sendReminderEmail(date, "1dayreminder");
});

export const threeHourReminderEmail = new ScheduleJob("threeHourReminderEmail", (date) => {
  console.log("Sending 3h reminder email");

  sendReminderEmail(date, "3hourreminder");
});

async function sendReminderEmail(date: Date, templateName: string) {
  // Check that there are in fact fixtures this week
  const fixtureHandler = new FixturesHandler();
  const fixtures = await fixtureHandler.getFixturesForCurrentWeek(date);

  if (fixtures == null || fixtures.length === 0) {
    console.log(`No fixtures found for this week`);
    return;
  }

  const startDate = moment(date).startOf("week");
  const endDate = moment(date).endOf("week");

  const userLoginsHandler = new UserLoginsHandler();
  const users = (await userLoginsHandler.getAllEntities())?.filter((user) => user.receiveNotificationEmails);

  if (users == null || users.length === 0) {
    console.log(`No users which have receiveNotificationEmails set`);
    return;
  }

  users.forEach(async (user) => {
    const predictionsHandler = new PredictionsHandler();
    const predictions = await predictionsHandler.getPredictionsInDateRange(startDate, endDate);

    if (
      predictions == null ||
      predictions.length === 0 ||
      predictions.some((prediction) => prediction.prediction === null)
    ) {
      const awsHandler = new AWSHandler();
      const fixtureTime = moment(fixtures[0].time, "HH:mm");
      const deadlineDate = moment(fixtures[0].date).set({
        hour: fixtureTime.get("hour"),
        minute: fixtureTime.get("minute"),
      });
      awsHandler.sendEmail(templateName, user, {
        deadlineDate: deadlineDate.format("DD Oct, HH:mm"),
      });
    } else {
      console.log(`Didn't send email to ${user.fullName} as they have already made their predictions`);
    }
  });
}
