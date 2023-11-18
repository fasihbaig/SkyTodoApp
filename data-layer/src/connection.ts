import mongoose from "mongoose";
import { UserModel } from "./models";

export class DataBaseConnection {
       /**
         * 
         * @returns { string }
       */
    private static getMongoDBUri(): string {
        return `mongodb://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}`;
    }

    public static async getDataLayerProvider() {
      const connection =  await mongoose.connect(DataBaseConnection.getMongoDBUri(), {});
      return {
          models:{  User:  connection.model('User', UserModel.schema) },
          connection
        };
    }
}