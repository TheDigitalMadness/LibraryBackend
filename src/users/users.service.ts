import { ForbiddenException, Injectable } from "@nestjs/common";
import { ChangeUserDto } from "./dto";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async getUsers(user: User) {
        if (!user.admin) {
            throw new ForbiddenException('You are not admin');
        }

        const foundUsers = await this.prisma.user.findMany({
            select: {
                id: true,
                username: true,
            }
        });

        return foundUsers;
    }

    async getUser(user: User, idS: string) {
        if (!user.admin) {
            throw new ForbiddenException('You are not admin');
        }

        const id = Number(idS);
        if (!id) {
            throw new ForbiddenException('id must ne Integer');
        }

        const foundUser = await this.prisma.user.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                username: true,
            }
        });

        if (!foundUser) {
            throw new ForbiddenException('User not found');
        }

        return foundUser;
    }

    async changeUser(user: User, idS: string, ChangeUserDto: ChangeUserDto) {
        if (!user.admin) {
            throw new ForbiddenException('You are not admin');
        }

        const id = Number(idS);
        if (!id) {
            throw new ForbiddenException('id must ne Integer');
        }

        if (!await this.prisma.user.findUnique({ where: { id: id } })) {
            throw new ForbiddenException('User not found');
        }

        const data: any = {};

        if (ChangeUserDto.username !== undefined) {
            data.username = ChangeUserDto.username;
        }

        if (ChangeUserDto.email !== undefined) {
            data.email = ChangeUserDto.email;
        }

        if (ChangeUserDto.admin !== undefined) {
            data.admin = ChangeUserDto.admin;
        }

        const foundUser = await this.prisma.user.update({
            where: {
                id: id
            },
            data: data,
            select: {
                id: true,
                email: true,
                username: true,
                admin: true,
            }
        });

        return foundUser;
    }

    async deleteUser(user: User, idS: string) {
        if (!user.admin) {
            throw new ForbiddenException('You are not admin');
        }

        const id = Number(idS);
        if (!id) {
            throw new ForbiddenException('id must ne Integer');
        }

        if (!await this.prisma.user.findUnique({ where: { id: id } })) {
            throw new ForbiddenException('User not found');
        }

        await this.prisma.user.delete({
            where: {
                id: id
            }
        });
    }

    async getUserBooks(user: User, idS: string) {
        if (!user.admin) {
            throw new ForbiddenException('You are not admin');
        }

        const id = Number(idS);
        if (!id) {
            throw new ForbiddenException('id must ne Integer');
        }

        if (!await this.prisma.user.findUnique({ where: { id: id } })) {
            throw new ForbiddenException('User not found');
        }

        const books = await this.prisma.book.findMany({
            where: {
                borrowerId: id
            },
            select: {
                id: true,
                title: true,
                description: true,
                genreId: true,
                authorId: true,
                borrowerId: true,
            }
        });

        return books;
    }
}