import pkg from "typeorm";
import { BaseEntity } from "./BaseEntity.js";
const { Entity, Column, Index } = pkg;

@Entity()
export class AnalyticsItems extends BaseEntity {
  @Column({ type: "character varying" })
  @Index({ unique: true })
  name?: string;

  @Column({ type: "text" })
  heading?: string;

  @Column({ type: "text" })
  html?: string;

  @Column({ type: "text", nullable: true })
  tagLineList?: string | null;
}
