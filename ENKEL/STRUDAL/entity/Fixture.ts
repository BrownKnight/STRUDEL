import {Entity, Column} from "typeorm";
import { FixtureResult } from "./dataTypes/FixtureResult.js";

@Entity()
export class Fixture {
    @Column("integer")
    fixtureID!: number;

    @Column("integer")
    homeTeamID!: number;

    @Column("integer")
    awayTeamID!: number;

    @Column({type: "enum", enum: FixtureResult})
    fixtureResult!: FixtureResult;
}