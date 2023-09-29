import { Module } from '@nestjs/common';
import { AuthModule, UserModule } from './modules';
import { DatabaseModule } from './modules/database/database.module';
import { UserService } from './modules/user/services';

@Module({
  imports: [UserModule, AuthModule, DatabaseModule],
})
export class AppModule {}
