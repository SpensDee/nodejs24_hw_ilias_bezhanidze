import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { SignInUserDto } from './dto/sing-in-user.dto';
import { SignUpUserDto } from './dto/sing-up-user.dto';
import { Auth } from './entities/auth.entity';
import * as process from "node:process";

@Injectable()
export class AuthService {
    private users: Auth[] = [];  // Имитация базы данных

    constructor(private jwtService: JwtService) {}

    async signUp(signUpDto: SignUpUserDto): Promise<Auth> {
        const { email, password, username } = signUpDto;
        const hashedPassword = await bcrypt.hash(password, 10); // Кодируем пароль

        // Получаем данные с фронта
        const user: Auth = {
            id: new Date().toISOString(),
            email,
            username,
            password: hashedPassword,
            refreshToken: null,
        };

        // Если все записалось, то пушим в объект и отдаем данные с закодированным паролем
        this.users.push(user);
        // Возвращаем данные
        return user;
    }


    async signIn(signInDto: SignInUserDto): Promise<{ access_token: string, refresh_token: string }> {
        const { email, password } = signInDto;
        const user = this.users.find(u => u.email === email);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Данные не найдены!');
        }

        const payload = { username: user.username, sub: user.id };

        // Генерация access token и refresh token
        const accessToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET_KEY,
        });
        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: '7d',
            secret: process.env.JWT_REFRESH_KEY,
        });

        user.refreshToken = refreshToken;

        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }

    async refreshTokens(refreshToken: string): Promise<{ access_token: string, refresh_token: string }> {
        const user = this.users.find(u => u.refreshToken === refreshToken);

        if (!user) {
            throw new UnauthorizedException('Рефреш токен недействителен!');
        }

        const payload = { username: user.username, sub: user.id };
        const accessToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET_KEY,
        });
        const newRefreshToken = this.jwtService.sign(payload, {
            expiresIn: '7d',
            secret: process.env.JWT_REFRESH_KEY,
        });

        user.refreshToken = newRefreshToken;

        return {
            access_token: accessToken,
            refresh_token: newRefreshToken,
        };
    }

    async getNewAccessToken(refreshToken: string): Promise<{ access_token: string }> {
        const user = this.users.find(u => u.refreshToken === refreshToken);

        if (!user) {
            throw new UnauthorizedException('Рефреш токен недействителен!');
        }

        const payload = { username: user.username, sub: user.id };
        const newAccessToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET_KEY,
        });

        return {
            access_token: newAccessToken,
        };
    }

    async validateUser(userId: string): Promise<Auth | null> {
        return this.users.find(user => user.id === userId) || null;
    }
}