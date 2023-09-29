import { Inject, Injectable } from '@nestjs/common';
import { MONGOOSE } from '../../../database/constants';
import { DbLayer } from '../../../database/types';

@Injectable()
export class AuthorizationService {
    constructor(
        @Inject(MONGOOSE) private readonly dbLayer: DbLayer
    ) {}


    public processLoginHandler(email: string, password: string) {
        const { User } = this.dbLayer.models;
        return User.findOne({
            email: {  $eq : email },
            password: { $eq: password }
        }, ["id","age", "email", "username"]).exec()
    }
}
