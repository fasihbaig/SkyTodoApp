import { Module } from '@nestjs/common';
import { AuthModule, UserModule } from './modules';
import { DbLayerModule } from './modules/db-layer/db-layer.module';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SharedModule } from './modules/shared/shared.module';

import configurations from "./config";
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './nest-common-utils';

const providers = [ JwtStrategy ]

@Module({
  imports: [
    JwtModule.registerAsync({
        useFactory: async (configService: ConfigService) => ({ 
            secret: configService.get<string>("auth.jwtSecret"),
            signOptions: { expiresIn: configService.get<string>("auth.jwtTokenExpiryTimeSec") }  
        }),
        inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      load: [configurations],
      isGlobal: true
    }),
    DbLayerModule.forRoot(),
    UserModule, 
    AuthModule, 
    SharedModule, 
  ],
  providers: [ 
    ConfigService,  
    ...providers
  ],
})

export class AppModule {}
