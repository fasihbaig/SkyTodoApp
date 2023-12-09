import { NestMiddleware } from "@nestjs/common";

export class UserDataMiddleware implements NestMiddleware {
    use(req: any, res: any, next: (error?: any) => void) {
        console.log("middleware")
        next()
    }
}