import { Body, Controller, Post, Get, UseGuards } from "@nestjs/common";
import { UserDto } from './dto';
import { AuthService } from './auth.service';
import { GetUser } from "../decorator";
import { User } from "@prisma/client";
import { JwtGuard } from "../guard";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    register(@Body() dto: UserDto) {
        return this.authService.register(dto);
    }

    @Post('login')
    login(@Body() dto: UserDto) {
        return this.authService.login(dto);
    }

    @UseGuards(JwtGuard)
    @Get('me')
    me(@GetUser() user: User) {
        return user;//this.authService.me(user);
    }
}