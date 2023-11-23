import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { UserService } from '../user/services';
import { AuthorizationService } from './service/authorization/authorization.service';

@Module({
    controllers: [AuthController],
    providers: [UserService, AuthorizationService],
})
export class AuthModule {
}
