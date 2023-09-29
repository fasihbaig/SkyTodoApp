import { Body, Controller, Inject, Post } from '@nestjs/common';
import { UserService } from '../../user/services';
import { AuthorizationService } from '../service/authorization/authorization.service';

@Controller('api/auth')
export class AuthController {

    constructor(
        private authorizationService: AuthorizationService
    ) {
  
    }

    
    @Post("login")
    public loginByCredentials(@Body() requestData: any): any {
        return this.authorizationService.processLoginHandler(requestData.email || requestData.username, requestData.password);
    }
}
