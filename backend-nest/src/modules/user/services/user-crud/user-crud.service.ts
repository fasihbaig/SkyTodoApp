import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { MONGOOSE, MONGOOSE_DB, User } from '@tm/data-layer';
import { omit } from "lodash";
import { TextHashManager } from "@tm/common";
import { ConfigService } from '@nestjs/config';
import { AuthorizationService } from '../../../auth';
import { ModuleRef } from '@nestjs/core';


@Injectable()
export class UserCrudService {
    private authorizationService: AuthorizationService
    constructor(
        private configService: ConfigService,
        private moduleRef: ModuleRef,
        @Inject(MONGOOSE) private readonly dbLayer: MONGOOSE_DB
    ) {}

    /**
     * 
     * @param user 
     * @returns 
     */
    public async createUserHandler(userDTO: any): Promise<any> {
        const { User } = this.dbLayer.models;
        userDTO.password = await TextHashManager.createTextHash(userDTO.password, this.configService.get("auth.passwordSaltRound"));
        const user = await await User.create(userDTO);

        this.authorizationService = this.moduleRef.get(AuthorizationService, { strict: false }); 
        const token = await this.authorizationService.generateAndSaveAuthToken(user);

        return {
            user: omit(  user.toObject(),  ["password"]),
            token
        }
    }
}
