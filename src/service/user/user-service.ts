import { UserNS, User } from "../../data-access-layer";

export class UserService {

   public static createUser(user: UserNS.IUser): Promise<UserNS.UserBaseDocument> {
       return User.create(user);
   }

   public static getUserById(id: string): any {
        return User.findById({id})
   }
}