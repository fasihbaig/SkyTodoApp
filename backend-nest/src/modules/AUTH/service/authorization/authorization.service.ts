import { Inject, Injectable, UseInterceptors, forwardRef } from '@nestjs/common';
import { MONGOOSE, MONGOOSE_DB, User  } from "@tm/data-layer";
import { TextHashManager } from "@tm/common";
import { omit } from "lodash";
import { RedisManager } from "@tm/integrations";
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../../USER';
import { JwtAuthService } from '../jwt-auth';
import { ApiTimeInterceptor } from '../../../../nest-common-utils/interceptors/';

@UseInterceptors(ApiTimeInterceptor)
@Injectable()
export class AuthorizationService {
    constructor(
       private jwtAuthService: JwtAuthService,
       private configService: ConfigService,
       private userService: UserService,
       @Inject(MONGOOSE) private readonly dbLayer: MONGOOSE_DB
    ) {}

    /**
     * 
     * @param { string } email 
     * @param { string } password 
     */
    public async processLoginHandler(email: string, password: string) {
        const user =  await this.userService.getUserByEmail(email);
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
        const jwtToken = await this.jwtAuthService.createNewToken({
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

}
