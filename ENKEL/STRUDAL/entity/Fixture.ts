import pkg from "typeorm";
const { PrimaryGeneratedColumn, Entity, Column, ManyToOne } = pkg;
import { FixtureResult } from "./dataTypes/FixtureResult.js";
import { Team } from "./Team.js";

@Entity()
export class Fixture {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Team)
  homeTeam!: Team;

  @ManyToOne(() => Team)
  awayTeam!: Team;

  @Column({ type: "enum", enum: FixtureResult })
  fixtureResult!: FixtureResult;
}
