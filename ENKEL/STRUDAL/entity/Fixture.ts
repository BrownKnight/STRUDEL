import pkg from "typeorm";
const { PrimaryGeneratedColumn, Entity, Column, ManyToOne, OneToMany } = pkg;
import { FixtureResult } from "./dataTypes/FixtureResult.js";
import { Prediction } from "./Prediction.js";
import { Team } from "./Team.js";

@Entity()
export class Fixture {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Team)
  homeTeam!: Team;

  @ManyToOne(() => Team)
  awayTeam!: Team;

  @Column({ type: "date" })
  date!: Date;

  @Column({ type: "enum", enum: FixtureResult, nullable: true })
  fixtureResult!: FixtureResult;

  @OneToMany(() => Prediction, (prediction) => prediction.fixture)
  predictions!: Prediction[];
}
