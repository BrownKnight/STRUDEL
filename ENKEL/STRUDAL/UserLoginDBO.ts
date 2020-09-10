import "reflect-metadata";
import { createConnection } from "typeorm";

import { UserLogin } from "./entity/UserLogin.js";


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

    async getEntity(): Promise<UserLogin> {
        return await this.conn().then(async conn => {
            let repository = conn.getRepository(UserLogin);
            return (await repository.find())[0];
        })
    }
}