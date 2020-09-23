import pkg from "typeorm";
const { PrimaryGeneratedColumn, Entity, Column, ManyToOne, Unique } = pkg;
import { FixtureResult } from "./dataTypes/FixtureResult.js";
import { Fixture } from "./Fixture.js";
import { UserLogin } from "./UserLogin.js";

@Entity()
@Unique("prediction_index", ["fixture", "user"])
export class Prediction {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Fixture)
  fixture!: Partial<Fixture>;

  @Column({ type: "enum", enum: FixtureResult, nullable: true })
  prediction!: FixtureResult;

  @ManyToOne(() => UserLogin)
  user!: Partial<UserLogin>;
}
