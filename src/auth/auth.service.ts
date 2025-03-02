import { ForbiddenException, Injectable } from "@nestjs/common";
import { UserDto } from "./dto";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { User } from "@prisma/client";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) { }

    async register(dto: UserDto) {
        const hash = await argon.hash(dto.password);

        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    username: dto.username,
                    hash: hash
                },
                select: {
                    id: true,
                    username: true,
                }
            })

            return this.signToken(user.id, user.username);
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentials taken');
                }
            }
            throw error;
        }
    }

    async login(dto: UserDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            }
        });

        if (!user) {
            throw new ForbiddenException('Credentials incorrect');
        }

        const pwMatch = await argon.verify(
            user.hash,
            dto.password,
        )

        if (!pwMatch) {
            throw new ForbiddenException('Credentials incorrect');
        }

        return this.signToken(user.id, user.username);
    }

    me(user: User) {
        return user;
    }

    async signToken(id: Number, username: string): Promise<{ access_token: string }> {
        const payload = {
            sub: id,
            username,
        }

        const secret = this.config.get('JWT_SECRET');

        const token = await this.jwt.signAsync(payload, {
            expiresIn: '15m',
            secret: secret,
        });

        return { access_token: token }
    }
}