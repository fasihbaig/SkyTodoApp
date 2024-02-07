import * as dotenv from "dotenv";
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from "@nestjs/platform-express";
import { ApiExceptionHandler } from "./nest-common-utils";
import { RedisManager } from "@tm/integrations";
import { BadRequestException, ValidationPipe } from "@nestjs/common";
import { Logger } from '@nestjs/common';
import { ValidationError } from "class-validator";
import { getAllConstraints } from "./nest-common-utils/custom-validation-error/custom-validation-error";

const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    snapshot: true
  });

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  })

  // Enable detailed logging
  app.useLogger(logger);

  RedisManager.initializeGlobalRedisInstance();

  // debugger middleware
  // app.use((req, res, next) => {
  //   next()
  // });

  //using pipes for class validators
  app.useGlobalPipes(new ValidationPipe({
    disableErrorMessages: false,
    transform: true,
    dismissDefaultMessages: true,
    enableDebugMessages: true,
    exceptionFactory: ((errors: ValidationError[]) => {
      //get all class validators error strings
      return new BadRequestException(getAllConstraints(errors))
    })
  }));

  //we will use swagger in future

  app.useGlobalFilters(new ApiExceptionHandler());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
