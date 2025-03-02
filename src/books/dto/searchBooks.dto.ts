import { IsInt, IsOptional, IsString } from "class-validator";

export class SearchBooksDto {
    @IsOptional()
    @IsInt()
    authorId?: number;

    @IsOptional()
    @IsInt()
    genreId?: number;
}