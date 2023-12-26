import { Body, Controller, Inject, Post, UseInterceptors } from '@nestjs/common';
import { AuthorizationService } from '../service/authorization/authorization.service';
import { ApiTimeInterceptor } from '../../../nest-common-utils/interceptors';
import { LoginDTO } from '../dtos';

@UseInterceptors(ApiTimeInterceptor)
@Controller('api/auth')
export class AuthController {

    constructor(
        private authorizationService: AuthorizationService
    ) {
  
    }

    
    @Post("login")
    public loginByCredentials(@Body() requestData: LoginDTO) {
        return this.authorizationService.processLoginHandler(requestData.email, requestData.password);
    }
}
