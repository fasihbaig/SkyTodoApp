import { Module } from '@nestjs/common';
import { AuthModule, UserModule } from './modules';

@Module({
  imports: [UserModule, AuthModule],
})
export class AppModule {}
