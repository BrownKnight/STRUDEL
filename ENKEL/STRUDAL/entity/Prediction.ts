import {Entity, Column} from "typeorm";
import { FixtureResult } from "./dataTypes/FixtureResult";
import { Fixture } from "./Fixture";

@Entity()
export class Prediction {
    @Column("integer")
    predictionID!: number;

    @Column("integer")
    fixtureID!: number;

    @Column({type: "enum", enum: FixtureResult})
    prediction!: FixtureResult;
}