import { Injectable, ForbiddenException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ChangeAuthorDto, CreateAuthorDto } from "./dto";
import { User } from "@prisma/client";

@Injectable()
export class AuthorsService {
    constructor(private prisma: PrismaService) { }

    async getAuthors() {
        const authors = await this.prisma.author.findMany({
            select: {
                id: true,
                name: true,
                surname: true,
                description: true,
            }
        });

        return authors;
    }

    async getAuthorById(idS: string) {
        const id = Number(idS);
        if (!id) {
            throw new ForbiddenException('id must be Integer');
        }

        const author = await this.prisma.author.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                name: true,
                surname: true,
                description: true,
                books: {
                    select: {
                        id: true,
                        genreId: true,
                        title: true,
                        description: true,
                    }
                }
            }
        });

        return author;
    }

    postAuthor(user: User, CreateAuthorDto: CreateAuthorDto) {
        if (!user.admin) {
            throw new ForbiddenException('You are not admin');
        }

        const author = this.prisma.author.create({
            data: {
                name: CreateAuthorDto.name,
                surname: CreateAuthorDto.surname,
                description: CreateAuthorDto.description,
            },
            select: {
                id: true,
                name: true,
                surname: true,
                description: true,
                books: {
                    select: {
                        id: true,
                        genreId: true,
                        title: true,
                        description: true,
                    }
                }
            }
        });

        return author;
    }

    async changeAuthorById(user: User, idS: string, ChangeAuthorDto: ChangeAuthorDto) {
        if (!user.admin) {
            throw new ForbiddenException('You are not admin');
        }

        const id = Number(idS);
        if (!id) {
            throw new ForbiddenException('id must be Integer');
        }

        if (!await this.prisma.author.findUnique({ where: { id: id } })) {
            throw new ForbiddenException('Author not found');
        }

        const data: any = {};

        if (ChangeAuthorDto.name !== undefined) {
            data.name = ChangeAuthorDto.name;
        }

        if (ChangeAuthorDto.surname !== undefined) {
            data.surname = ChangeAuthorDto.surname;
        }

        if (ChangeAuthorDto.description !== undefined) {
            data.description = ChangeAuthorDto.description;
        }

        const author = await this.prisma.author.update({
            where: {
                id: id
            },
            data: data,
            select: {
                id: true,
                name: true,
                surname: true,
                description: true,
                books: {
                    select: {
                        id: true,
                        genreId: true,
                        title: true,
                        description: true,
                    }
                }
            }
        });

        return author;
    }

    async deleteAuthorById(user: User, idS: string) {
        if (!user.admin) {
            throw new ForbiddenException('You are not admin');
        }

        const id = Number(idS);
        if (!id) {
            throw new ForbiddenException('id must be Integer');
        }

        if (!await this.prisma.author.findUnique({ where: { id: id } })) {
            throw new ForbiddenException('Author not found');
        }

        await this.prisma.book.deleteMany({
            where: {
                authorId: id
            }
        });

        await this.prisma.author.delete({
            where: {
                id: id
            }
        });
    }
}