import { faker } from "@faker-js/faker";
import { Request, Response } from "express";

import { ServiceContainer, TYPES, UserService } from "../service";

const userController = {
    createUser: async ( request: Request, response: Response ) => {   
        const {name, username, email, password, avatar, gender} = request.body;
        const userService = ServiceContainer.get<UserService>(TYPES.UserService);
        const user = await userService.createUser({
            name,
            username,
            email,
            avatar: avatar || faker.image.avatar(),
            password,
            gender
        });
        response.send(user);
    }
}

export default userController;