import { UserNS, User } from "../../data-access-layer";

export class UserService {

   /**
    * 
    * @param { UserNS.IUser } user 
    * @returns {Promise<UserNS.UserBaseDocument> }
    */
   public static createUser(user: UserNS.IUser): Promise<UserNS.UserBaseDocument> {
       return User.create(user);
   }

   /**
    * 
    * @param {string} id 
    * @returns {Promise<UserNS.UserBaseDocument | null>}
    */
   public static getUserById(id: string): Promise<UserNS.UserBaseDocument | null> {
        return User.findById({id}).exec()
   }

   /**
    * 
    * @param {UserNS.IUser} user 
    * @returns {Promise<UserNS.UserBaseDocument[]>}
    */
   public static getUsers(user: UserNS.IUser): Promise<UserNS.UserBaseDocument[]> { 
    return User.find({
       $op: Object.keys(user).map((key) => ({[key]: user[key as UserNS.IUserKey]}))
    }).exec();
}
}