import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthModule, UserModule } from './modules';
import { DbLayerModule } from './modules/DB-LAYER/db-layer.module';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SharedModule } from './modules/SHARED-MODULE/shared.module';

import configurations from "./config";
import { UserDataMiddleware } from './nest-common-utils/middlewares';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { EventEmitterModule } from '@nestjs/event-emitter';

const providers = [ ConfigService ]

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configurations],
      isGlobal: true
    }),
    DevtoolsModule.register({
        http: process.env.NODE_ENV !== 'production'
    }),
    DbLayerModule.forRoot(),
    UserModule, 
    AuthModule, 
    SharedModule, 
    EventEmitterModule.forRoot()
  ],
  providers: [ 
    ...providers,
  ],
})

export class AppModule {}
// implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(UserDataMiddleware).forRoutes({ path: "*", method: RequestMethod.ALL})
//   }

// }
