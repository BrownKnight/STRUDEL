import pkg from "typeorm";
import { BaseEntity } from "./BaseEntity.js";
const { Entity, Column, Index } = pkg;

@Entity()
export class Team extends BaseEntity {
  @Column("character varying")
  @Index({ unique: true })
  teamName?: string;

  @Column("character varying", { nullable: true })
  teamLogoUrl?: string;
}
