import "reflect-metadata";
import pkg from "typeorm";
import bcrypt from "bcrypt";
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
  password!: string;

  @Column("character varying", { nullable: true })
  token!: string;

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
