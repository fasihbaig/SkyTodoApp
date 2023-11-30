import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_PAYLOAD } from './types';
import { UserService } from 'src/modules/user/services';
import { User } from '@tm/data-layer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
    
    constructor( 
        private userService: UserService,
        private configService: ConfigService
        ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get("auth.jwtSecret"), 
        })
    }

    /**
     * 
     * @param { JWT_PAYLOAD } payload 
     * @returns { Promise<User> }
     */
    async validate(payload: JWT_PAYLOAD): Promise<User> {
        const user = await this.userService.getUserById(payload.id);
        if(!user) {
            throw new Error("Invalid token");
        }

        return user;
    }
}
