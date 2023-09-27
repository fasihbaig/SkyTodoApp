import { Module, Post } from '@nestjs/common';
import { get } from 'http';
import { AuthController } from './controllers/auth.controller';

@Module({
    controllers: [AuthController]
})
export class AuthModule {
}
