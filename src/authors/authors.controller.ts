import { Body, Controller, Delete, ForbiddenException, Get, HttpCode, Param, Post, Put, UseGuards } from "@nestjs/common";
import { AuthorsService } from "./authors.service";
import { ChangeAuthorDto, CreateAuthorDto } from "./dto";
import { JwtGuard } from "src/guard";
import { GetUser } from "src/decorator";
import { User } from "@prisma/client";

@Controller('authors')
export class AuthorsController {
    constructor(private readonly authorsService: AuthorsService) { }

    @Get()
    getAuthors() {
        return this.authorsService.getAuthors();
    }

    @Get(':id')
    getAuthorById(@Param('id') id: string) {
        return this.authorsService.getAuthorById(id);
    }

    @UseGuards(JwtGuard)
    @Post()
    postAuthor(@GetUser() user: User, @Body() CreateAuthorDto: CreateAuthorDto) {
        if (CreateAuthorDto === undefined) {
            throw new ForbiddenException('Body must be initialized');
        }
        return this.authorsService.postAuthor(user, CreateAuthorDto);
    }

    @UseGuards(JwtGuard)
    @Put(':id')
    changeAuthorById(@GetUser() user: User, @Param('id') id: string, @Body() ChangeAuthorDto: ChangeAuthorDto) {
        if (ChangeAuthorDto === undefined) {
            throw new ForbiddenException('Body must be initialized');
        }
        return this.authorsService.changeAuthorById(user, id, ChangeAuthorDto);
    }

    @HttpCode(204)
    @UseGuards(JwtGuard)
    @Delete(':id')
    async deleteAuthorById(@GetUser() user: User, @Param('id') id: string) {
        await this.authorsService.deleteAuthorById(user, id);
    }
}