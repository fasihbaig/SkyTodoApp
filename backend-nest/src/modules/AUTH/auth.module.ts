import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { UserModule, UserService } from '../USER';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthorizationService, JwtAuthService } from './service';
import { ConfigService } from '@nestjs/config';


@Module({
    controllers: [AuthController],
    providers: [ 
        AuthorizationService, 
        JwtService,
        UserService,
        JwtAuthService
    ],
    imports: [  
        JwtModule.registerAsync({
            useFactory: async (configService: ConfigService) => ({ 
                secret: configService.get<string>("auth.jwtSecret"),
                signOptions: { expiresIn: configService.get<string>("auth.jwtTokenExpiryTimeSec") },
            }),
            inject: [ConfigService]
        }),
        UserModule
    ],
    exports: [AuthorizationService ]
})
export class AuthModule {}
