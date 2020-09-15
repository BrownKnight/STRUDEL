import pkg from "typeorm";
const { PrimaryColumn, Entity, Column } = pkg;

@Entity()
export class Team {
    @PrimaryColumn("integer")
    teamID!: number;

    @Column("character varying")
    teamName!: string;
}