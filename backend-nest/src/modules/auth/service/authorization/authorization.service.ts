import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { MONGOOSE, MONGOOSE_DB, User  } from "@tm/data-layer";
import { TextHashManager } from "@tm/common";
import { JWT_PAYLOAD } from '../../../../nest-common-utils/strategies/jwt/types';
import { JwtService } from '@nestjs/jwt';
import { omit } from "lodash";
import { RedisManager } from "@tm/integrations";
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../../user';

@Injectable()
export class AuthorizationService {
    constructor(
       private jwtService: JwtService,
       private configService: ConfigService,
       @Inject(MONGOOSE) private readonly dbLayer: MONGOOSE_DB
    ) {}

    /**
     * 
     * @param { string } email 
     * @param { string } password 
     */
    public async processLoginHandler(email: string, password: string) {
        const user =  await this.getUserByEmail(email);
        if(!user) {
            throw new Error("User not found.")
        }

        const isValidPassword = await TextHashManager.compareHash(user.password, password);
        if(!isValidPassword) {
            throw new Error("Invalid User Credentials.")
        }

        const jwtToken = await this.generateAndSaveAuthToken(user);

        return {
            user: omit(user.toObject(), ["password"]),
            token: jwtToken
        }
    }


    /**
     * 
     * @param { User } user 
     * @returns { Promise<string> }
     */
    public async generateAndSaveAuthToken(user: User): Promise<string> {
        const jwtToken = await this.generateWebToken({
            id: user.get("id"),
            email: user.get("email"),
            username: user.get("username"),
            createdDate: new Date().toLocaleString()
        }); 

        await this.addTokenToRedis(jwtToken);

        return jwtToken  
    }

    /**
     * 
     * @param { string } token 
     */
    private async addTokenToRedis(token: string): Promise<void> {
       await RedisManager.getGlobalRedisInstance().addData(token, "1", this.configService.get<string>("auth.jwtTokenExpiryTimeSec"));
    }

    /**
     * 
     * @param { JWT_PAYLOAD } payload 
     * @returns { Promise<string> }
     */
    private generateWebToken(payload: JWT_PAYLOAD): Promise<string> {
        return this.jwtService.signAsync(payload, {secret: this.configService.get<string>("auth.jwtSecret")});
    }

      /**
     * 
     * @param { string } email 
     * @returns { Promise<User | null> }
     */
      private getUserByEmail(email: string): Promise< User | null> {
        const { User } = this.dbLayer.models;
        return User.findOne({
            email: {  $eq : email },
            isBlocked: { $ne: true }
        }, ["id","age", "email", "username", "password"]).exec()
    }
}
