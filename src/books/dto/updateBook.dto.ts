import { IsInt, IsOptional, IsString } from "class-validator";

export class UpdateBookDto {
    @IsOptional()
    @IsInt()
    authorId?: number;

    @IsOptional()
    @IsInt()
    genreId?: number;

    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;
}