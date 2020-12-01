import pkg from "typeorm";
import { BaseEntity } from "./BaseEntity.js";
import { ScheduleType } from "./dataTypes/ScheduleType.js";
const { Entity, Column, Index } = pkg;

@Entity()
export class Schedule extends BaseEntity {
  @Column({ type: "character varying" })
  @Index({ unique: true })
  name!: string;

  @Column({ type: "character varying" })
  cron!: string;

  @Column({ type: "character varying" })
  jobName!: string;

  @Column({ type: "enum", enum: ScheduleType })
  scheduleType!: ScheduleType;
}
