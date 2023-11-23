import { Inject, Injectable } from '@nestjs/common';

import { MONGOOSE, MONGOOSE_DB  } from "@tm/data-layer";

@Injectable()
export class AuthorizationService {
    constructor(
        @Inject(MONGOOSE) private readonly dbLayer: MONGOOSE_DB
    ) {}


    public processLoginHandler(email: string, password: string) {
        const { User } = this.dbLayer.models;
        return User.findOne({
            email: {  $eq : email },
            password: { $eq: password }
        }, ["id","age", "email", "username"]).exec()
    }
}
