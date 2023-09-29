import { Body, Controller, Post } from '@nestjs/common';
import { UserCrudService, UserService } from '../../services';

@Controller('api/user')
export class UserController {

    constructor(
        private userCrudService: UserCrudService
    ) {}

    @Post("create")
    async createUser(@Body() userDTO: any) {
        const user = await this.userCrudService.createUserHandler(userDTO);
        return user;
    }
}
