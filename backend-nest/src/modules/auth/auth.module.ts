import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { UserService } from '../user/services';
import { DatabaseModule } from '../database/database.module';
import { AuthorizationService } from './service/authorization/authorization.service';

@Module({
    controllers: [AuthController],
    providers: [UserService, AuthorizationService],
    imports: [DatabaseModule]  
})
export class AuthModule {
}
