import { Module } from '@nestjs/common';
import { UserController } from './controllers';
import { UserCrudService, UserService } from './services';
import { DbLayerModule } from '../db-layer/db-layer.module';


@Module({
    controllers: [ UserController ],
    providers: [ 
        UserService, 
        UserCrudService, 
      //  DbLayerModule 
    ],
    exports: [ UserService]
})

export class UserModule {}
