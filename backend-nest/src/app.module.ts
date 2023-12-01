import { Module } from '@nestjs/common';
import { AuthModule, UserModule } from './modules';
import { DbLayerModule } from './modules/db-layer/db-layer.module';
import { ConfigModule } from "@nestjs/config";
import { SharedModule } from './modules/shared/shared.module';
import configurations from "./config";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configurations],
      isGlobal: true
    }),
    DbLayerModule.forRoot(),
    UserModule, 
    AuthModule, 
    SharedModule,
  ],
  providers: [],
})

export class AppModule {}
