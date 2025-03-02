import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class ChangeAuthorDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    surname: string;

    @IsOptional()
    @IsString()
    description: string;
}