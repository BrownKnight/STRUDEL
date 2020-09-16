import pkg from "typeorm";
const { PrimaryGeneratedColumn, Entity, Column, ManyToOne } = pkg;
import { FixtureResult } from "./dataTypes/FixtureResult.js";
import { Team } from "./Team.js";

@Entity()
export class Fixture {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(type => Team)
    homeTeam!: Team;

    @ManyToOne(type => Team)
    awayTeam!: Team;

    @Column({type: "enum", enum: FixtureResult})
    fixtureResult!: FixtureResult;
}