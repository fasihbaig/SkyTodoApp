import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_PAYLOAD } from './types';
import { UserService } from '../../../modules/user';
import { MONGOOSE, MONGOOSE_DB, User } from '@tm/data-layer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    
    constructor( 
        @Inject(MONGOOSE) private readonly dbLayer: MONGOOSE_DB,
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
        const user = await this.getUserById(payload.id);
        if(!user) {
            throw new Error("Invalid token");
        }

        return user;
    }

      /**
     * 
     * @param { string } id 
     * @returns { Promise<User | null> }
     */
      private getUserById(id: string): Promise<User | null> {
        const { User } = this.dbLayer.models;
        return User.findOne({
            id: {  $eq : id },
        }).exec()
    }
}
