import "reflect-metadata";
import pkg from "typeorm";
const { PrimaryColumn, Entity, Column } = pkg;

@Entity()
export class UserLogin {
  @PrimaryColumn("character varying")
  id!: string;

  @Column("character varying")
  emailAddress!: string;

  @Column("character varying")
  fullName!: string;

  @Column("character varying")
  password!: string;

  @Column("character varying", { nullable: true })
  salt!: string;
}
