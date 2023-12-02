import { Inject, Injectable } from '@nestjs/common';
import { MONGOOSE, MONGOOSE_DB, User  } from "@tm/data-layer";
import { TextHashManager } from "@tm/common";
import { JWT_PAYLOAD } from '../jwt-strategy/types';
import { JwtService } from '@nestjs/jwt';
import { omit } from "lodash";
import { UserService } from '../../../user/services';
import { RedisManager, RedisTimeMode } from "@tm/integrations";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthorizationService {
    constructor(
        private jwtService: JwtService,
        private userService: UserService,
        private configService: ConfigService
    ) {}

    /**
     * 
     * @param { string } email 
     * @param { string } password 
     */
    public async processLoginHandler(email: string, password: string) {
        const user = await this.userService.getUserByEmail(email);
        if(!user) {
            throw new Error("User not found.")
        }

        const isValidPassword = await TextHashManager.compareHash(user.password, password);
        if(!isValidPassword) {
            throw new Error("Invalid User Credentials.")
        }

        const jwtToken = await this.generateWebToken({
            id: user.get("id"),
            email: user.get("email"),
            username: user.get("username"),
            createdDate: new Date().toLocaleString()
        }); 

        await this.addTokenToRedis(jwtToken);

        return {
            user: omit(user.toObject(), ["password"]),
            token: jwtToken
        }
    }

    /**
     * 
     * @param { string } token 
     */
    private async addTokenToRedis(token: string): Promise<void> {
       await RedisManager.getGlobalRedisInstance().addData(token, "1", RedisTimeMode.EX, this.configService.get<string>("auth.jwtTokenExpiryTimeSec"));
    }

    private generateWebToken(payload: JWT_PAYLOAD): Promise<string> {
        return this.jwtService.signAsync(payload);
    }
}
