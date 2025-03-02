import { IsOptional, IsString } from "class-validator";

export class CreateAuthorDto {
    @IsString()
    name: string;

    @IsString()
    surname: string;

    @IsOptional()
    @IsString()
    description?: string;
}