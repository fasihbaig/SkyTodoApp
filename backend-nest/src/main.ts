import * as dotenv from "dotenv";
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from "@nestjs/platform-express";
import { ApiExceptionHandler } from "./nest-common-utils";
import { RedisManager } from "@tm/integrations";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    snapshot: true
  });

  RedisManager.initializeGlobalRedisInstance();

  // debugger middleware
  // app.use((req, res, next) => {
  //   next()
  // });

  app.useGlobalFilters(new ApiExceptionHandler());

  await app.listen( process.env.PORT || 3000);
}
bootstrap();
