import pkg from "typeorm";
import { BaseEntity } from "./BaseEntity.js";
const { Entity, Column, Index } = pkg;

@Entity()
export class MinedData extends BaseEntity {
  @Column({ type: "character varying" })
  @Index({ unique: true })
  name?: string;

  @Column({ type: "jsonb" })
  json?: string;
}
