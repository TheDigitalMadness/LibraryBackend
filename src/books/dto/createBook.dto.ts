import { IsInt, IsString } from "class-validator";

export class CreateBookDto {
    @IsInt()
    authorId: number;

    @IsInt()
    genreId: number;

    @IsString()
    title: string;

    @IsString()
    description: string;
}