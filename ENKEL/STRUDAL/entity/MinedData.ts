import pkg from "typeorm";
import { BaseEntity } from "./BaseEntity.js";
const { Entity, Column } = pkg;

@Entity()
export class MinedData extends BaseEntity {
  @Column({ type: "jsonb", nullable: true })
  json?: string | null;
}
