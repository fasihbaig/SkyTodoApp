import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { UserService } from '../user/services';
import { AuthorizationService } from './service/authorization/authorization.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategyService } from './service/jwt-strategy/jwt-strategy.service';

@Module({
    controllers: [AuthController],
    providers: [ 
        AuthorizationService, 
        JwtStrategyService,
        UserService
    ],
    imports: [ 
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1h' }
        })
    ]
})
export class AuthModule {}
