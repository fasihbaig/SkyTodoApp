import { Inject, Injectable } from '@nestjs/common';
import { MONGOOSE, MONGOOSE_DB, User  } from "@tm/data-layer";
import { TextHashManager } from "@tm/common";

@Injectable()
export class AuthorizationService {
    constructor(
        @Inject(MONGOOSE) private readonly dbLayer: MONGOOSE_DB
    ) {}


    public async processLoginHandler(email: string, password: string) {
        const user = await this.getUserByEmail(email);
        if(!user) {
            throw new Error("User not found.")
        }

        const isValidPassword = await TextHashManager.compareHash(user.password, password);
        if(!isValidPassword) {
            throw new Error("Invalid User Credentials.")
        }
    }

    private getUserByEmail(email: string): Promise< User | null> {
        const { User } = this.dbLayer.models;
        return User.findOne({
            email: {  $eq : email },
            isBlocked: { $ne: true }
        }, ["id","age", "email", "username", "password"]).exec()
    }
}
