import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, ForbiddenException, HttpCode } from "@nestjs/common";
import { User } from "@prisma/client";
import { GetUser } from "src/decorator";
import { JwtGuard } from "src/guard";
import { ChangeGenreDto, CreateGenreDto } from "./dto";
import { GenresService } from "./genres.service";

@Controller('genres')
export class GenresController {
    constructor(private genresService: GenresService) { }

    @Get()
    getGenres() {
        return this.genresService.getGenres();
    }

    @Get(':id')
    getGenreById(@Param('id') id: string) {
        return this.genresService.getGenreById(id);
    }

    @UseGuards(JwtGuard)
    @Post()
    createGenre(@GetUser() user: User, @Body() CreateGenreDto: CreateGenreDto) {
        if (CreateGenreDto === undefined) {
            throw new ForbiddenException('Body must be initialized');
        }
        return this.genresService.createGenre(user, CreateGenreDto);
    }

    @UseGuards(JwtGuard)
    @Put(':id')
    changeGenre(@GetUser() user: User, @Param('id') id: string, @Body() ChangeGenreDto: ChangeGenreDto) {
        if (ChangeGenreDto === undefined) {
            throw new ForbiddenException('Body must be initialized');
        }
        return this.genresService.changeGenre(user, id, ChangeGenreDto);
    }

    @HttpCode(204)
    @UseGuards(JwtGuard)
    @Delete(':id')
    async deleteGenre(@GetUser() user: User, @Param('id') id: string) {
        await this.genresService.deleteGenre(user, id);
    }
}