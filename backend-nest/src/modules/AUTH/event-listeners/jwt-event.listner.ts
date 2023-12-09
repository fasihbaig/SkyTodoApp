import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { User } from "@tm/data-layer";
import { GET_JWT_TOKEN_USER, VERIFY_JWT_TOKEN } from "../../../events";

import { JWT_PAYLOAD, JwtAuthService } from "../service";

@Injectable()
export class JwtEventListener {

    constructor(
        private jwtAuthService: JwtAuthService
    ) {}

    @OnEvent(VERIFY_JWT_TOKEN)
    verifyUserExistenceListener({token}): Promise<JWT_PAYLOAD> {
      return this.jwtAuthService.verifyToken(token);
    }
}