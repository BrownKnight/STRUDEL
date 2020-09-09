import "reflect-metadata";
import { createConnection } from "typeorm";

import { UserLogin } from "./entity/UserLogin";


export class UserLoginDBO {
    private conn() {
        return createConnection({
            type: "postgres",
            host: process.env.STRUDAL_DATABASE_HOST,
            username: process.env.STRUDAL_DATABASE_USERNAME,
            password: process.env.STRUDAL_DATABASE_PASSWORD,
            database: "STRUDELDB",
            entities: [
                UserLogin
            ],
            synchronize: true
        })
    }
}