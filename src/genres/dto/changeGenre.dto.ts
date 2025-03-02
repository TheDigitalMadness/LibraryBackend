import { IsOptional, IsString } from "class-validator";

export class ChangeGenreDto {
    @IsOptional()
    @IsString()
    description: string;
}