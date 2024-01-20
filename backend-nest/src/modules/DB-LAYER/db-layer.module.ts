import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataBaseConnection, MONGOOSE } from '@tm/data-layer';

@Global()
@Module({
  imports: [ConfigModule]
})
export class DbLayerModule {

  static async forRoot() {
    const dbLayerProvider = {
      provide: MONGOOSE,
      useFactory: async (configService: ConfigService) => {
        return DataBaseConnection.getDataLayerProvider(
          configService.get("database.host"),
          configService.get("database.username"),
          configService.get("database.password"),
          configService.get("database.port"),
          configService.get("database.authSource"),
          {
            dbName: configService.get("database.dbName")
          }
        );
      },
      inject: [ConfigService],
    };

    return {
      module: DbLayerModule,
      providers: [dbLayerProvider],
      exports: [dbLayerProvider]
    }
  }
}