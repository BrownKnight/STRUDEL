import "reflect-metadata";
import { BaseDAO } from "./BaseDAO.js";
import { Schedule } from "../entity/Schedule.js";

export class ScheduleDAO extends BaseDAO<Schedule> {
  constructor() {
    super(Schedule);
  }
}
