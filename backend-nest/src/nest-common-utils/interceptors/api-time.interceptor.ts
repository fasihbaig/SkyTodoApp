import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ApiTimeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const now = Date.now();
    const req = context.switchToHttp().getRequest()
    return next
      .handle()
      .pipe(
        tap(() => console.log(`${req.path} response time: ${Date.now() - now}ms`)),
      );
  }
}