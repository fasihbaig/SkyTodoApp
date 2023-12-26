import { IsAlphanumeric, IsNotEmpty, IsString, Length, MinLength } from "class-validator";

export class LoginDTO {
    @IsNotEmpty({ message: "Email should not be empty."})
    @IsString({ message: "Email should be of type string."})
    @Length(4, 100, { message: "Email length should bet between 4 - 100 characters."})
    email: string;

    @IsNotEmpty({ message: "Password should not be empty."})
    @IsString({ message: "Password should not be of type string."})
    @MinLength(4, { message: "Password min length is 4 characters."})
    password: string;
}