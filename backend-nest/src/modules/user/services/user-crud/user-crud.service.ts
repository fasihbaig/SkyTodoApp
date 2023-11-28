import { Inject, Injectable } from '@nestjs/common';
import { MONGOOSE, MONGOOSE_DB, User } from '@tm/data-layer';
import { omit } from "lodash";
import { TextHashManager } from "@tm/common";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserCrudService {

    constructor(
        private configService: ConfigService,
        @Inject(MONGOOSE) private readonly dbLayer: MONGOOSE_DB
    ) {}

    /**
     * 
     * @param user 
     * @returns 
     */
    public async createUserHandler(user: any): Promise<User> {
        const { User } = this.dbLayer.models;
        user.password = await TextHashManager.createTextHash(user.password, this.configService.get("auth.passwordSaltRound"));
        return omit(
            (await User.create(user)).toObject(),
            ["password"]
        );
    }
}
