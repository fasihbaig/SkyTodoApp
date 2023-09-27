import { connect, Mongoose } from "mongoose";

export class DataBase {
    private databaseConnection: Mongoose | null = null;

    constructor() {}

    public async initializeDBConnection(): Promise<Mongoose> {
        try {
            this.databaseConnection = await connect(DataBase.getMongoDBUri(), {
                dbName: process.env.DB_NAME
            });
            this.databaseConnection.set('strictQuery', true);
            return  this.databaseConnection;
        } catch (error) {
            throw Error("Unable to create connection with DB")
        }
    }

    /**
     * 
     * @returns {string}
     */
    private static getMongoDBUri(): string {
        console.log(process.env)
        return `mongodb://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}`;
    }
}

