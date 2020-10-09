import "reflect-metadata";
import pkg from "typeorm";
import bcrypt from "bcrypt";
import { UserRole } from "./dataTypes/UserRoles.js";
import { BaseEntity } from "./BaseEntity.js";
const { Entity, Column, BeforeUpdate, BeforeInsert, Index } = pkg;

@Entity()
export class UserLogin extends BaseEntity {
  @Column("character varying")
  @Index({ unique: true })
  emailAddress!: string;

  @Column("character varying")
  fullName!: string;

  @Column("character varying")
  password!: string | undefined;

  @Column("character varying", { nullable: true })
  token!: string | null | undefined;

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
