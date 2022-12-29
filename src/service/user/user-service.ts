import { UserNS, User } from "../../data-access-layer";

import { injectable, inject } from "inversify";
import "reflect-metadata";

@injectable()
export class UserService {

    constructor() {}

   /**
    * 
    * @param { UserNS.IUser } user 
    * @returns {Promise<UserNS.UserBaseDocument> }
    */
   public createUser(user: UserNS.IUser): Promise<UserNS.UserBaseDocument> {
       return User.create(user);
   }

   /**
    * 
    * @param {string} id 
    * @returns {Promise<UserNS.UserBaseDocument | null>}
    */
   public getUserById(id: string): Promise<UserNS.UserBaseDocument | null> {
        return User.findById({id}).exec()
   }

   /**
    * 
    * @param {UserNS.IUser} user 
    * @returns {Promise<UserNS.UserBaseDocument[]>}
    */
   public getUsers(user: UserNS.IUser): Promise<UserNS.UserBaseDocument[]> { 
    return User.find({
       $op: Object.keys(user).map((key) => ({[key]: user[key as UserNS.IUserKey]}))
    }).exec();
}
}