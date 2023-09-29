export class DataBaseConnection {
       /**
         * 
         * @returns { string }
       */
       public static getMongoDBUri(): string {
        return `mongodb://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}`;
    }
}