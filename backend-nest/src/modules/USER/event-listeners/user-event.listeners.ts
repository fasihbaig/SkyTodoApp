import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { User } from "@tm/data-layer";
import { GET_JWT_TOKEN_USER } from "src/events";
import { UserService } from "../services";

@Injectable()
export class UserEventsListeners {

    constructor(
        private userService: UserService
    ) {}

    @OnEvent(GET_JWT_TOKEN_USER)
    verifyUserExistenceListener({id}): Promise<User | null> {
      return this.userService.getUserById(id);
    }
}