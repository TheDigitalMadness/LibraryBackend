import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class ChangeUserDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsOptional()
    @IsNotEmpty()
    @IsBoolean()
    admin: boolean;
}