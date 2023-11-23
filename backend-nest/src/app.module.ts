import { Module } from '@nestjs/common';
import { AuthModule, UserModule } from './modules';
import { DataBaseConnection, MONGOOSE, MONGOOSE_DB } from "@tm/data-layer";
import { DbLayerModule } from './modules/db-layer/db-layer.module';

@Module({
  imports: [
    DbLayerModule.forRoot(),
    UserModule, 
    AuthModule
  ],
  providers: [],
//  exports: [ MONGOOSE ]
})
export class AppModule {}
