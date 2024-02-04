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
    authSource?: string,
    isAtlas = false,
    options?: ConnectOptions
  ) {
    //example uri:  mongodb://root:12345678@localhost:27017/TempTestDB?authMechanism=DEFAULT&authSource=admin
    //ATLAS URL DB_MONGO_HOST_IS_ATLAS
    // mongodb+srv://genesis-engineering:7W0kJYk9tqOateo5@genesisengineering.ikxdtog.mongodb.net/UniveristyDB
    let uri = `mongodb${isAtlas ? "+srv" : ""}://${userName}:${password}@${host}${port ? `:${port}` : ""}/`;
    if (options && options.dbName) {
      uri += options.dbName;
    };

    if (authSource) {
      uri += `?authMechanism=DEFAULT&authSource=${authSource}`
    }
    console.log(`DB URI: ${uri.replace(password, "********")}`)
    const connection = await mongoose.connect(uri, options || {});
    return {
      models: { User: connection.model('User', UserModel.schema) },
      connection
    };
  }
}