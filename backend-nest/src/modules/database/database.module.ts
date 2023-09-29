import { Module } from '@nestjs/common';
import mongoose, { Connection, Models } from 'mongoose';
import { UserModel } from './models';
import { DataBaseConnection } from './connection';
import { DbLayer, MongooseModel } from './types';
import { MONGOOSE } from './constants';


@Module({
    providers: [
        {
          provide:  MONGOOSE,
          useFactory: async (): Promise<DbLayer> =>{
            const connection =  await mongoose.connect(DataBaseConnection.getMongoDBUri(), {});
            return {
                models:{  User:  connection.model('User', UserModel.schema) },
                connection
              };
         }
        },
      ],
      exports: [MONGOOSE],
  })

export class DatabaseModule {}
