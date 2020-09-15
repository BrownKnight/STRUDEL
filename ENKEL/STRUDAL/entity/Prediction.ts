import pkg from "typeorm";
const { PrimaryColumn, Entity, Column, ManyToOne } = pkg;
import { FixtureResult } from "./dataTypes/FixtureResult.js";
import { Fixture } from "./Fixture.js";
import { UserLogin } from "./UserLogin.js";

@Entity()
export class Prediction {
    @PrimaryColumn("integer")
    predictionID!: number;

    @ManyToOne(type => Fixture)
    fixture!: Fixture;

    @Column({type: "enum", enum: FixtureResult})
    prediction!: FixtureResult;

    @ManyToOne(() => UserLogin)
    user!: UserLogin
}