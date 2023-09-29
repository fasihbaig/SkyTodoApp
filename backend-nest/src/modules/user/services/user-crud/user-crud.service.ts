import { Inject, Injectable } from '@nestjs/common';
import { MONGOOSE } from '../../../database/constants';
import { DbLayer } from '../../../database/types';
import { User } from 'src/modules/database/models';

@Injectable()
export class UserCrudService {

    constructor(
        @Inject(MONGOOSE) private readonly dbLayer: DbLayer
    ) {}

    public createUserHandler(user: any): Promise<User> {
        const { User } = this.dbLayer.models;
        return User.create(user);
    }
}
