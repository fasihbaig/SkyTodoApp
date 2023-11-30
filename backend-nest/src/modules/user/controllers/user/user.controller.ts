import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserCrudService, UserService } from '../../services';
import { JwtAuthGuard } from '../../../../nest-common-utils/gaurds/jwt-auth-gaurd';

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

    @UseGuards(JwtAuthGuard)
    @Get("/")
    async getAllUsers() {
        return this.userService.getAllUsers()
    }
}
