import { Inject, Injectable } from '@nestjs/common';
import { MONGOOSE, MONGOOSE_DB, User } from '@tm/data-layer';

@Injectable()
export class UserService {

    constructor(
        @Inject(MONGOOSE) private readonly dbLayer: MONGOOSE_DB
    ) {

    }

    getAllUsers(): Promise<User[]> {
       return this.dbLayer.models.User.find().exec()
    }
}
