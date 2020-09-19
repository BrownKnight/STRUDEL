import pkg from "typeorm";
const { PrimaryGeneratedColumn, Entity, Column } = pkg;

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("character varying")
  teamName!: string;
}
