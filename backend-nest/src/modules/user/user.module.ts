import { Module } from '@nestjs/common';
import { UserController } from './controllers';
import { UserCrudService, UserService } from './services';
import { DatabaseModule } from '../database/database.module';


@Module({
    controllers: [ UserController ],
    providers: [ UserService, UserCrudService ],
    imports: [ DatabaseModule ]  
})
export class UserModule {
}
