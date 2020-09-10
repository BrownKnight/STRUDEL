import {Entity, Column} from "typeorm";

@Entity()
export class Team {
    @Column("integer")
    teamID!: number;

    @Column("character varying")
    teamName!: string;
}