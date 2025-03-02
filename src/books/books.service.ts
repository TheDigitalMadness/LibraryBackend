import { ForbiddenException, Injectable } from "@nestjs/common";
import { SearchBooksDto, CreateBookDto, UpdateBookDto } from "./dto";
import { PrismaService } from "src/prisma/prisma.service";
import { User } from "@prisma/client";

@Injectable()
export class BooksService {
    constructor(private prisma: PrismaService) { }

    async getBooks(SearchBooksDto: SearchBooksDto) {
        const where: any = {}

        if (SearchBooksDto.authorId) {
            where.authorId = SearchBooksDto.authorId;
        }

        if (SearchBooksDto.genreId) {
            where.genreId = SearchBooksDto.genreId;
        }

        const books = await this.prisma.book.findMany({
            where: where,
            select: {
                id: true,
                authorId: true,
                genreId: true,
                title: true,
                description: true,
            }
        });

        return books;
    }

    async getBookById(idS: string) {
        const id = Number(idS);
        if (!id) {
            throw new ForbiddenException('id must be Integer');
        }

        const book = await this.prisma.book.findUnique({
            where: {
                id: Number(id),
            },
            select: {
                id: true,
                authorId: true,
                genreId: true,
                title: true,
                description: true,
                user: {
                    select: {
                        username: true,
                    }
                }
            }
        });

        if (!book) {
            throw new ForbiddenException('Book not found');
        }

        return book;
    }

    async postBook(user: User, CreateBookDto: CreateBookDto) {
        if (!user.admin) {
            throw new ForbiddenException('You are not admin');
        }

        if (!await this.prisma.author.findUnique({ where: { id: CreateBookDto.authorId } })) {
            throw new ForbiddenException('Author not found');
        }

        if (!await this.prisma.genre.findUnique({ where: { id: CreateBookDto.genreId } })) {
            throw new ForbiddenException('Genre not found');
        }

        const book = await this.prisma.book.create({
            data: {
                authorId: CreateBookDto.authorId,
                genreId: CreateBookDto.genreId,
                title: CreateBookDto.title,
                description: CreateBookDto.description,
            },
            select: {
                id: true,
                authorId: true,
                genreId: true,
                title: true,
                description: true,
            }
        });

        return book;
    }

    async changeBookById(user: User, idS: string, UpdateBookDto: UpdateBookDto) {
        if (!user.admin) {
            throw new ForbiddenException('You are not admin');
        }

        const id = Number(idS);
        if (!id) {
            throw new ForbiddenException('id must be Integer');
        }

        const data: any = {};

        if (! await this.prisma.book.findUnique({ where: { id } })) {
            throw new ForbiddenException('Book not found');
        }

        if (UpdateBookDto.authorId !== undefined) {
            if (!await this.prisma.author.findUnique({ where: { id: UpdateBookDto.authorId } })) {
                throw new ForbiddenException('Author not found');
            }
            data.authorId = UpdateBookDto.authorId;
        }

        if (UpdateBookDto.genreId !== undefined) {
            if (!await this.prisma.genre.findUnique({ where: { id: UpdateBookDto.genreId } })) {
                throw new ForbiddenException('Genre not found');
            }
            data.genreId = UpdateBookDto.genreId;
        }

        if (UpdateBookDto.title !== undefined) {
            data.title = UpdateBookDto.title;
        }

        if (UpdateBookDto.description !== undefined) {
            data.description = UpdateBookDto.description;
        }

        const book = await this.prisma.book.update({
            where: {
                id: Number(id)
            },
            data: data,
        });

        if (!book) {
            throw new ForbiddenException('Book not found');
        }

        return book;
    }

    async deleteBookById(user: User, idS: string) {
        if (!user.admin) {
            throw new ForbiddenException('You are not admin');
        }

        const id = Number(idS);
        if (!id) {
            throw new ForbiddenException('id must be Integer');
        }

        if (!await this.prisma.book.findUnique({ where: { id } })) {
            throw new ForbiddenException('Book not found');
        }

        await this.prisma.book.delete({
            where: {
                id: id,
            }
        });
    }

    async borrowBookById(user: User, idS: string) {
        const id = Number(idS);
        if (!id) {
            throw new ForbiddenException('id must be Integer');
        }

        const book = await this.prisma.book.findUnique({
            where: {
                id: id,
            },
            select: {
                user: true,
            }
        });

        if (!book) {
            throw new ForbiddenException('Book not found');
        }

        if (book.user !== null) {
            throw new ForbiddenException('Book is already borrowed');
        }

        await this.prisma.book.update({
            where: {
                id: id,
            },
            data: {
                borrowerId: user.id,
            }
        });
    }

    async returnBookById(user: User, idS: string) {
        const id = Number(idS);
        if (!id) {
            throw new ForbiddenException('id must be Integer');
        }

        const book = await this.prisma.book.findUnique({
            where: {
                id: id,
            },
            select: {
                user: {
                    select: {
                        id: true,
                    }
                }
            }
        })

        if (!book) {
            throw new ForbiddenException('Book not found');
        }

        if (book.user?.id !== user.id) {
            throw new ForbiddenException('Book is not borrowed by you');
        }

        await this.prisma.book.update({
            where: {
                id: id,
            },
            data: {
                borrowerId: null,
            }
        });
    }
}