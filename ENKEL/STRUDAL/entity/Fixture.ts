import pkg from "typeorm";
const { PrimaryGeneratedColumn, Entity, Column, ManyToOne } = pkg;
import { FixtureResult } from "./dataTypes/FixtureResult.js";
import { Team } from "./Team.js";

@Entity()
export class Fixture {
    @PrimaryGeneratedColumn()
    fixtureID!: number;

    @ManyToOne(type => Team)
    homeTeamID!: Team;

    @ManyToOne(type => Team)
    awayTeamID!: Team;

    @Column({type: "enum", enum: FixtureResult})
    fixtureResult!: FixtureResult;
}