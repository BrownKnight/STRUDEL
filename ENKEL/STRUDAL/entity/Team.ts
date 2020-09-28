import pkg from "typeorm";
const { PrimaryGeneratedColumn, Entity, Column, Index } = pkg;

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column("character varying")
  @Index({ unique: true })
  teamName?: string;

  @Column("character varying", { nullable: true })
  teamLogoUrl?: string;
}
