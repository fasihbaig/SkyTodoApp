import { Global, Module } from '@nestjs/common';
import { DataBaseConnection, MONGOOSE, MONGOOSE_DB } from '@tm/data-layer';

@Global()
@Module({
    imports: []
})
export class DbLayerModule {

    static async forRoot() {
        const dbLayerProvider = {
            provide: MONGOOSE,
            useFactory: async () => {
              return DataBaseConnection.getDataLayerProvider(
                  process.env.DB_HOST,
                  process.env.DB_USER_NAME,
                  process.env.DB_PASSWORD,
                  process.env.DB_PORT
              );
            }
          };

        return {
            module: DbLayerModule,
            providers: [dbLayerProvider],
            exports: [ dbLayerProvider ]
        }
    }
}
