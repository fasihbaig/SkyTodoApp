import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './controllers';
import { UserCrudService, UserService } from './services';

@Module({
   imports: [ ],
    controllers: [ UserController ],
    providers: [ 
        UserService, 
        UserCrudService
    ],
    exports: [ UserService ]
})

export class UserModule {}
