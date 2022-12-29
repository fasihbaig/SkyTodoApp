import { injectable } from "inversify";
import { UserNS, User } from "../../data-access-layer";

@injectable()
export class AuthenticationService {

   /**
    * 
    * @param {string} id 
    * @returns {Promise<UserNS.UserBaseDocument | null>}
    */
   public async login(username: string, password: string): Promise<UserNS.UserBaseDocument | null> {
        return this.getLoginUser(username, password);
   }

   /**
    * 
    * @param username 
    * @param password 
    * @returns 
    */
   public getLoginUser(username: string, password: string): Promise<UserNS.UserBaseDocument | null> {
    return User.findOne({
        $or: [{username}, {email: username}],
        password,
        isBlocked: false
    }).exec();
  }

  /**
   * 
   * @param username 
   * @param password 
   * @returns 
   */
  public generateToken(username: string, password: string): Promise<UserNS.UserBaseDocument | null> {
    return User.findOne({
        $or: [{username}, {email: username}],
        password
    }).exec();
  }
}