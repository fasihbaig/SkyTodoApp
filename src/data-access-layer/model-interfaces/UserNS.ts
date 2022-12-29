import { Document } from "mongoose";

export namespace UserNS  {
    export interface IUser {
        name: string;
        username: string;
        email: string;
        avatar?: string;
        password: string;
        gender: Gender
    }

    export type IUserKey = keyof IUser;

    export interface UserBaseDocument extends  IUser, Document {};
    
    export enum Gender {
        MALE = "male",
        FEMALE = "female",
        OTHER = "other"
    }
}
  