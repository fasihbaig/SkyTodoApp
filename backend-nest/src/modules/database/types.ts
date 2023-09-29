import mongoose, { Model } from "mongoose"
import { User } from "./models"

export type MongooseModel = {
    User: Model<User>
}

export type DbLayer = {connection: typeof mongoose, models: MongooseModel }