import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { PrismaService } from "../prisma/prisma.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'ThisIsMyJwt') {
    constructor(config: ConfigService, private prisma: PrismaService) {
        const jwtSecret = config.get('JWT_SECRET');

        if (!jwtSecret) {
            throw new Error('JWT_SECRET is not defined');
        }

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtSecret
        });
    }

    async validate(payload: { sub: number, username: string }) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: payload.sub
            },
            select: {
                id: true,
                username: true,
                admin: true,
            }
        });

        if (!user) {
            throw new Error('User not found');
        }

        return user;

    }
}