import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserCrudService, UserService } from '../../services';

@Controller('api/user')
export class UserController {

    constructor(
        private userCrudService: UserCrudService,
        private userService: UserService
    ) {}

    @Post("create")
    async createUser(@Body() userDTO: any) {
        const user = await this.userCrudService.createUserHandler(userDTO);
        return user;
    }

    @Get("/")
    async getAllUsers() {
        return this.userService.getAllUsers()
    }
}
