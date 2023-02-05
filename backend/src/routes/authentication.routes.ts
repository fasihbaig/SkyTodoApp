import {userController} from  "../controllers" ;

import express, { Request, Response } from "express";
import { body } from "express-validator";
import { asyncHandler, validate } from "../utils";

const router = express.Router();
router.post(
        "/login",
        validate([
            body("username")
            .exists()
            .isString()
            .trim()
            .withMessage("Invalid Username"),
            body("password")
            .exists()
            .isString()
            .trim()
            .withMessage("Invalid Password"),
        ]),
        asyncHandler(userController.createUser)
);
export default router;
    
