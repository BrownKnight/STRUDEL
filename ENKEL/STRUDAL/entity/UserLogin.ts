import {Entity, Column} from "typeorm";

@Entity()
export class UserLogin {
    @Column("character varying")
    userID!: string;

    @Column("character varying")
    emailAddress!: string;

    @Column("character varying")
    password!: string;

    @Column("character varying")
    salt!: string;
}