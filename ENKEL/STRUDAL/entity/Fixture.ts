import pkg from "typeorm";
import { BaseEntity } from "./BaseEntity.js";
const { Entity, Column, ManyToOne, OneToMany, Unique } = pkg;
import { FixtureResult } from "./dataTypes/FixtureResult.js";
import { Prediction } from "./Prediction.js";
import { Team } from "./Team.js";

@Entity()
@Unique("fixture_index", ["date", "homeTeam", "awayTeam"])
export class Fixture extends BaseEntity {
  @ManyToOne(() => Team)
  homeTeam!: Team;

  @ManyToOne(() => Team)
  awayTeam!: Team;

  @Column({ type: "date" })
  date!: Date;

  @Column({ type: "time", default: "00:00:00" })
  time!: Date;

  @Column({ type: "enum", enum: FixtureResult, nullable: true })
  fixtureResult!: FixtureResult;

  @OneToMany(() => Prediction, (prediction) => prediction.fixture)
  predictions!: Prediction[];

  @Column({ type: "bool", default: true })
  locked!: boolean;

  @Column({ type: "int", default: 0 })
  week!: number;
}
