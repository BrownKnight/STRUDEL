import "reflect-metadata";
import pkg from "typeorm";
const { PrimaryGeneratedColumn, Entity, Column } = pkg;

@Entity()
export class UserLogin {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("character varying")
  emailAddress!: string;

  @Column("character varying")
  fullName!: string;

  @Column("character varying")
  password!: string;

  @Column("character varying", { nullable: true })
  salt!: string;
}
