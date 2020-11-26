import pkg from "typeorm";
import { BaseEntity } from "./BaseEntity.js";
const { Entity, Column, Index } = pkg;

@Entity()
export class Schedule extends BaseEntity {
  @Column({ type: "character varying" })
  @Index({ unique: true })
  name?: string;

  @Column({ type: "character varying" })
  cron?: string;

  @Column({ type: "character varying" })
  jobName?: string;
}
