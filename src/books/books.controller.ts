import { Body, Controller, Delete, Get, Post, Put, Param, UseGuards, HttpCode, Query, ForbiddenException } from "@nestjs/common";
import { CreateBookDto, SearchBooksDto, UpdateBookDto } from "./dto";
import { BooksService } from "./books.service";
import { JwtGuard } from "src/guard";
import { GetUser } from "src/decorator";
import { User } from "@prisma/client";

@Controller('books')
export class BooksController {
    constructor(private booksService: BooksService) { }

    @Get()
    getBooks(@Query() SearchBooksDto: SearchBooksDto) {
        return this.booksService.getBooks(SearchBooksDto);
    }

    @Get(':id')
    getBookById(@Param('id') id: string) {
        return this.booksService.getBookById(id);
    }

    @UseGuards(JwtGuard)
    @Post()
    postBook(@GetUser() user: User, @Body() CreateBookDto: CreateBookDto) {
        if (CreateBookDto === undefined) {
            throw new ForbiddenException('Body must be initialized');
        }
        return this.booksService.postBook(user, CreateBookDto);
    }

    @UseGuards(JwtGuard)
    @Put(':id')
    changeBookById(@GetUser() user: User, @Param('id') id: string, @Body() UpdateBookDto: UpdateBookDto) {
        if (UpdateBookDto === undefined) {
            throw new ForbiddenException('Body must be initialized');
        }
        return this.booksService.changeBookById(user, id, UpdateBookDto);
    }

    @HttpCode(204)
    @UseGuards(JwtGuard)
    @Delete(':id')
    async deleteBookById(@GetUser() user: User, @Param('id') id: string) {
        await this.booksService.deleteBookById(user, id);
    }

    @HttpCode(200)
    @UseGuards(JwtGuard)
    @Post(':id/borrow')
    async borrowBookById(@GetUser() user: User, @Param('id') id: string) {
        await this.booksService.borrowBookById(user, id);
    }

    @HttpCode(200)
    @UseGuards(JwtGuard)
    @Post(':id/return')
    async returnBookById(@GetUser() user: User, @Param('id') id: string) {
        await this.booksService.returnBookById(user, id);
    }
}