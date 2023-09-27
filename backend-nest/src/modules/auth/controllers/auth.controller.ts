import { Controller, Post } from '@nestjs/common';

@Controller('api/auth')
export class AuthController {

    
    @Post("login")
    public loginByCredentials(): any {
        return {
            name: "fasih",
            id: 123,
            token: "Dsfdfsdfsdf"
        }
    }

}
