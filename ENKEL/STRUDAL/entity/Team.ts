import pkg from "typeorm";
const { PrimaryGeneratedColumn, Entity, Column, Index } = pkg;

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id!: number | undefined;

  @Column("character varying")
  @Index({ unique: true })
  teamName!: string;
}
