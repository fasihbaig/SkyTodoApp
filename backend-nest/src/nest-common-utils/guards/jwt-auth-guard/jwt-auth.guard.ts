import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { VERIFY_JWT_TOKEN, GET_JWT_TOKEN_USER } from '../../../events';


@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector, 
    private eventEmitter: EventEmitter2
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const [payloadToken] = await this.eventEmitter.emitAsync(VERIFY_JWT_TOKEN, req.headers.authorizations);
      const [user] = await this.eventEmitter.emitAsync(GET_JWT_TOKEN_USER, {userId: payloadToken.id})
      if( !user ) {
        throw new UnauthorizedException("Unable to authorize user.");
      }
      req.user = user;
      return true;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException("Unable to authorize user.", error && error.message && { cause: error.message});
    }
  }
}