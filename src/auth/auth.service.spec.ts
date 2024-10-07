import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { SignInUserDto } from './dto/sing-in-user.dto';
import { SignUpUserDto } from './dto/sing-up-user.dto';
import { Auth } from './entities/auth.entity';

@Injectable()
export class AuthService {
  private users: Auth[] = [];

  constructor(private jwtService: JwtService) {}

  async signUp(signUpDto: SignUpUserDto): Promise<Auth> {
    const { email, password, username } = signUpDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user: Auth = {
      id: new Date().toISOString(),
      email,
      username,
      password: hashedPassword,
      refreshToken: null,
    };

    this.users.push(user);
    return user;
  }

  async signIn(signInDto: SignInUserDto): Promise<{ access_token: string }> {
    const { email, password } = signInDto;
    const user = this.users.find(u => u.email === email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(userId: string): Promise<Auth | null> {
    return this.users.find(user => user.id === userId) || null;
  }
}