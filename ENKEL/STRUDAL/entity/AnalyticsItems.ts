import pkg from "typeorm";
import { BaseEntity } from "./BaseEntity.js";
const { Entity, Column, Unique, Index } = pkg;

@Entity()
@Unique("analytics_item_index", ["analyticsHtml"])
export class AnalyticsItems extends BaseEntity {
  @Column({ type: "varying character" })
  @Index({ unique: true })
  name?: string;

  @Column({ type: "text" })
  heading?: string;

  @Column({ type: "text" })
  html?: string;

  @Column({ type: "string" })
  tagLineList?: string;
}
