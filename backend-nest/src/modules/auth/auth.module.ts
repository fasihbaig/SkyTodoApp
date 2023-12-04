import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthorizationService } from './service/authorization/authorization.service';
import { UserModule, UserService } from '../user';
import { JwtService } from '@nestjs/jwt';

@Module({
    controllers: [AuthController],
    providers: [ 
        AuthorizationService, 
        JwtService,
        UserService
    ],
    imports: [  
        UserModule
    ],
    exports: [AuthorizationService ]
})
export class AuthModule {}
