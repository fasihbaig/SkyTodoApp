import mongoose, { ConnectOptions } from "mongoose";
import { UserModel } from "./models";


export class DataBaseConnection {

    /**
     * 
     * @param { string } host 
     * @param { string } userName 
     * @param { string } password 
     * @param { string } port 
     * @param { ConnectOptions? } options
     * @returns { Promise<MONGOOSE_DB> } 
     */
    public static async getDataLayerProvider(
      host: string,
      userName: string,
      password: string,
      port: string,
      options?: ConnectOptions
    ) {
     const uri =  `mongodb://${userName}:${password}@${host}:${port}`;
      const connection =  await mongoose.connect(uri, options || {});
      return {
          models:{  User:  connection.model('User', UserModel.schema) },
          connection
        };
    }
}