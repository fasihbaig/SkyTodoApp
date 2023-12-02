import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { UserService } from '../user/services';
import { AuthorizationService } from './service/authorization/authorization.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategyService } from './service/jwt-strategy/jwt-strategy.service';
import { ConfigService } from '@nestjs/config';

@Module({
    controllers: [AuthController],
    providers: [ 
        AuthorizationService, 
        JwtStrategyService,
        UserService
    ],
    imports: [ 
        JwtModule.registerAsync({
            useFactory: async (configService: ConfigService) => ({ 
                secret: configService.get<string>("auth.jwtSecret"),
                signOptions: { expiresIn: configService.get<string>("auth.jwtTokenExpiryTimeSec") }  
            }),
            inject: [ConfigService]
        })
    ]
})
export class AuthModule {}
