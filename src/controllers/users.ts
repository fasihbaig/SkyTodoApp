import { faker } from "@faker-js/faker";
import { Request, Response } from "express";

import { UserService } from "../service";

const userController = {
    createUser: async ( request: Request, response: Response ) => {   
        const {name, username, email, password, avatar, gender} = request.body;
        const user = await UserService.createUser({
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