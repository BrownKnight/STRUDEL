import pkg from "typeorm";
import { BaseEntity } from "./BaseEntity.js";
const { Entity, Column, ManyToOne, Unique } = pkg;
import { FixtureResult } from "./dataTypes/FixtureResult.js";
import { Fixture } from "./Fixture.js";
import { UserLogin } from "./UserLogin.js";

@Entity()
@Unique("prediction_index", ["fixture", "user"])
export class Prediction extends BaseEntity {
  @ManyToOne(() => Fixture)
  fixture!: Partial<Fixture>;

  @Column({ type: "enum", enum: FixtureResult, nullable: true })
  prediction!: FixtureResult;

  @Column({ type: "float", nullable: true })
  homeWinProbability?: number;

  @Column({ type: "float", nullable: true })
  drawProbability?: number;

  @Column({ type: "float", nullable: true })
  awayWinProbability?: number;

  @ManyToOne(() => UserLogin)
  user!: Partial<UserLogin>;
}
