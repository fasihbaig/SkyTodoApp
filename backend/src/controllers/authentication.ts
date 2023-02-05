import { Request, Response } from "express";

import { UserService } from "../service";

const userController = {
    createUser: async ( request: Request, response: Response ) => {   
        const {username, email, password} = request.body;
       
        response.send({});
    }
}

export default userController;