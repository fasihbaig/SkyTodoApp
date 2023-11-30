import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MONGOOSE, MONGOOSE_DB, User } from '@tm/data-layer';

@Injectable()
export class UserService {

    constructor(
        @Inject(MONGOOSE) private readonly dbLayer: MONGOOSE_DB,
        private config: ConfigService
    ) {

    }

     /**
     * 
     * @param { string } email 
     * @returns { Promise<User | null> }
     */
     public getUserByEmail(email: string): Promise< User | null> {
        const { User } = this.dbLayer.models;
        return User.findOne({
            email: {  $eq : email },
            isBlocked: { $ne: true }
        }, ["id","age", "email", "username", "password"]).exec()
    }

    /**
     * 
     * @param { string } id 
     * @returns { Promise<User | null> }
     */
    public getUserById(id: string): Promise<User | null> {
        const { User } = this.dbLayer.models;
        return User.findOne({
            id: {  $eq : id },
        }).exec()
    }

    /**
     * 
     * @returns { Promise<User[]> }
     */
    public getAllUsers(): Promise<User[]> {
       return this.dbLayer.models.User.find().exec()
    }
}
