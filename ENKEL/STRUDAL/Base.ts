import pkg from "typeorm";
import { UserLogin } from "./entity/UserLogin.js";
import { Team } from "./entity/Team.js";
import { Fixture } from "./entity/Fixture.js";
import { Prediction } from "./entity/Prediction.js";
import { AnalyticsItems } from "./entity/AnalyticsItems.js";
import { MinedData } from "./entity/MinedData.js";
import { Schedule } from "./entity/Schedule.js";
const { createConnection } = pkg;

export async function initDb(): Promise<void> {
  console.log(`Connecting to db at ${process.env.STRUDAL_DATABASE_HOST}:${process.env.STRUDAL_DATABASE_PORT}`);
  await createConnection({
    type: "postgres",
    host: process.env.STRUDAL_DATABASE_HOST,
    port: parseInt(process.env.STRUDAL_DATABASE_PORT ?? ""),
    username: process.env.STRUDAL_DATABASE_USERNAME,
    password: process.env.STRUDAL_DATABASE_PASSWORD,
    database: process.env.STRUDAL_DATABASE_NAME,
    entities: [UserLogin, Team, Fixture, Prediction, AnalyticsItems, MinedData, Schedule],
    synchronize: true,
    //logging: true,
  })
    .then(() => {
      console.log(`Conected to db at ${process.env.STRUDAL_DATABASE_HOST}:${process.env.STRUDAL_DATABASE_PORT}`);
    })
    .catch((err) => {
      console.error(
        `Could not connect to db at ${process.env.STRUDAL_DATABASE_HOST}:${process.env.STRUDAL_DATABASE_PORT}`
      );
      console.error(err);
    });
}
