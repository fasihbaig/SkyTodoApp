import {userController} from  "../controllers" ;

import express, { Request, Response } from "express";
import { body } from "express-validator";
import { UserNS } from "../data-access-layer";
import { asyncHandler, validate } from "../utils";

const userRouter = express.Router();
userRouter.post(
        "/",
        validate([
            body("name")
            .exists()
            .isString()
            .trim()
            .withMessage("Invalid name"),
            body("username")
            .exists()
            .isString()
            .trim()
            .withMessage("Invalid Username"),
            body("email")
            .exists()
            .isString()
            .trim()
            .withMessage("Invalid Email"),
            body("password")
            .exists()
            .isString()
            .trim()
            .withMessage("Invalid Password"),
            body("avatar")
            .optional()
            .isString()
            .trim()
            .withMessage("Invalid Avatar"),
            body("gender")
            .exists()
            .isIn(Object.values(UserNS.Gender))
            .trim()
            .withMessage("Invalid Gender."),
        ]),
        asyncHandler(userController.createUser)
);
export default userRouter;
    
