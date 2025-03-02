import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateBookDto {
    @IsOptional()
    @IsNotEmpty()
    @IsInt()
    authorId?: number;

    @IsOptional()
    @IsNotEmpty()
    @IsInt()
    genreId?: number;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    title?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    description?: string;
}