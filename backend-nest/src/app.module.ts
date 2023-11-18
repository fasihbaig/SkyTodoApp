import { Module } from '@nestjs/common';
import { AuthModule, UserModule } from './modules';

@Module({
  imports: [UserModule, AuthModule],
  providers: [
    {
      provide:  dataLayer.DB_LAYER,
      useFactory: async (): Promise<dataLayer.DbLayer> =>{
       return dataLayer.getDataLayerProvider()
     }
    },
  ],
   exports: [dataLayer. MONGOOSE ],
})
export class AppModule {}
