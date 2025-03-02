import { Controller, Get, Put, Delete, Param, UseGuards, HttpCode, Body, ForbiddenException, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { JwtGuard } from "src/guard";
import { ChangeUserDto } from "./dto";
import { GetUser } from "src/decorator";
import { User } from "@prisma/client";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @UseGuards(JwtGuard)
    @Get()
    getUsers(@GetUser() user: User) {
        return this.usersService.getUsers(user);
    }

    @UseGuards(JwtGuard)
    @Get(':id')
    getUser(@GetUser() user: User, @Param('id') id: string) {
        return this.usersService.getUser(user, id);
    }

    @UseGuards(JwtGuard)
    @Put(':id')
    changeUser(@GetUser() user: User, @Param('id') id: string, @Body() ChangeUserDto: ChangeUserDto) {
        if (ChangeUserDto === undefined) {
            throw new ForbiddenException('Body must be initialized');
        }
        return this.usersService.changeUser(user, id, ChangeUserDto);
    }

    @HttpCode(204)
    @UseGuards(JwtGuard)
    @Delete(':id')
    async deleteUser(@GetUser() user: User, @Param('id') id: string) {
        await this.usersService.deleteUser(user, id);
    }

    @UseGuards(JwtGuard)
    @Get(':id/books')
    getUserBooks(@GetUser() user: User, @Param('id') id: string) {
        return this.usersService.getUserBooks(user, id);
    }
}