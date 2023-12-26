import { Body, Controller, Inject, Post, UseInterceptors } from '@nestjs/common';
import { AuthorizationService } from '../service/authorization/authorization.service';
import { ApiTimeInterceptor } from '../../../nest-common-utils/interceptors';

@UseInterceptors(ApiTimeInterceptor)
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
