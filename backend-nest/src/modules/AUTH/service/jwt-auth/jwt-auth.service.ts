import { JwtService } from "@nestjs/jwt";
import { JWT_PAYLOAD } from "./types";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtAuthService {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService
    ) {}

    public async createNewToken(payload: JWT_PAYLOAD): Promise<string> {
        try {
            const token = await this.jwtService.signAsync(payload, { 
                secret: this.configService.get<string>("auth.jwtSecret"),
            });
            return token;
        } catch (error) {
            console.log(error);
            throw new Error("Unable to create token")
        }
    }

    public async verifyToken(token: string): Promise<JWT_PAYLOAD> {
       return this.jwtService.verifyAsync(token, { secret: this.configService.get<string>("auth.jwtSecret"),})
    }


}