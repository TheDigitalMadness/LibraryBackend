import { Injectable, ForbiddenException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ChangeGenreDto, CreateGenreDto } from "./dto";
import { User } from "@prisma/client";

@Injectable()
export class GenresService {
    constructor(private prisma: PrismaService) { }

    async getGenres() {
        const genres = await this.prisma.genre.findMany({
            select: {
                id: true,
                description: true,
            }
        });

        return genres;
    }

    async getGenreById(idS: string) {
        const id = Number(idS);
        if (!id) {
            throw new ForbiddenException('id must be Integer');
        }

        const genre = await this.prisma.genre.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                description: true,
            }
        });

        if (!genre) {
            throw new ForbiddenException('Genre not found');
        }

        return genre;
    }

    async createGenre(user: User, CreateGenreDto: CreateGenreDto) {
        if (!user.admin) {
            throw new ForbiddenException('You are not admin');
        }

        const genre = await this.prisma.genre.create({
            data: CreateGenreDto,
            select: {
                id: true,
                description: true,
            }
        });

        return genre;
    }

    async changeGenre(user: User, idS: string, ChangeGenreDro: ChangeGenreDto) {
        if (!user.admin) {
            throw new ForbiddenException('You are not admin');
        }

        const id = Number(idS);
        if (!id) {
            throw new ForbiddenException('id must be Integer');
        }

        if (!await this.prisma.genre.findUnique({ where: { id: id } })) {
            throw new ForbiddenException('Genre not found');
        }

        const data: any = {}

        if (ChangeGenreDro.description !== undefined) {
            data.description = ChangeGenreDro.description;
        }

        const genre = await this.prisma.genre.update({
            where: {
                id: id
            },
            data: data,
            select: {
                id: true,
                description: true,
            }
        });

        return genre;
    }

    async deleteGenre(user: User, idS: string) {
        if (!user.admin) {
            throw new ForbiddenException('You are not admin');
        }

        const id = Number(idS);
        if (!id) {
            throw new ForbiddenException('id must be Integer');
        }

        if (!await this.prisma.genre.findUnique({ where: { id: id } })) {
            throw new ForbiddenException('Genre not found');
        }

        await this.prisma.book.deleteMany({
            where: {
                genreId: id
            },
        });

        await this.prisma.genre.delete({
            where: {
                id: id
            }
        });

    }
}