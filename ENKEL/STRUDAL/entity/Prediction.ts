import pkg from "typeorm";
const { PrimaryGeneratedColumn, Entity, Column, ManyToOne } = pkg;
import { FixtureResult } from "./dataTypes/FixtureResult.js";
import { Fixture } from "./Fixture.js";
import { UserLogin } from "./UserLogin.js";

@Entity()
export class Prediction {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Fixture)
  fixture!: Fixture;

  @Column({ type: "enum", enum: FixtureResult, nullable: true })
  prediction!: FixtureResult;

  @ManyToOne(() => UserLogin)
  user!: UserLogin;
}
