import "reflect-metadata";
import pkg from "typeorm";
import bcrypt from "bcrypt";
import { UserRole } from "./dataTypes/UserRoles.js";
const { PrimaryGeneratedColumn, Entity, Column, BeforeUpdate, BeforeInsert } = pkg;

@Entity()
export class UserLogin {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("character varying")
  emailAddress!: string;

  @Column("character varying")
  fullName!: string;

  @Column("character varying")
  password!: string | undefined;

  @Column("character varying", { nullable: true })
  token!: string;

  @Column({ type: "enum", enum: UserRole })
  userRole!: UserRole;

  @BeforeInsert()
  @BeforeUpdate()
  encryptPassword(): void {
    // If password is included in the request to update, then we assume its a new plaintext
    if (this.password) {
      console.log("Password present on entity, hashing it");
      this.password = bcrypt.hashSync(this.password, 10);
    }
  }
}
