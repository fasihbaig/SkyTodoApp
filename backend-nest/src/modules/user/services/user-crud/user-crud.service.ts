import { Inject, Injectable } from '@nestjs/common';
import { MONGOOSE, MONGOOSE_DB, User } from '@tm/data-layer';

@Injectable()
export class UserCrudService {

    constructor(
        @Inject(MONGOOSE) private readonly dbLayer: MONGOOSE_DB
    ) {}

    public createUserHandler(user: any): Promise<User> {
        const { User } = this.dbLayer.models;
        return User.create(user);
    }
}
