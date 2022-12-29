import { UserNS, User } from "../../data-access-layer";

export class UserService {

   /**
    * 
    * @param {string} id 
    * @returns {Promise<UserNS.UserBaseDocument | null>}
    */
   public static async login(username: string, password: string): Promise<UserNS.UserBaseDocument | null> {
        return UserService.getLoginUser(username, password);
   }


   public static getLoginUser(username: string, password: string): Promise<UserNS.UserBaseDocument | null> {
    return User.findOne({
        $or: [{username}, {email: username}],
        password,
        isBlocked: false
    }).exec()
  }

  public static generateToken(username: string, password: string): Promise<UserNS.UserBaseDocument | null> {
    return User.findOne({
        $or: [{username}, {email: username}],
        password
    }).exec()
  }
}