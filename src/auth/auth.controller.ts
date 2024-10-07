import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from './auth.service';
import {SignInUserDto} from './dto/sing-in-user.dto';
import {SignUpUserDto} from './dto/sing-up-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post('sign-up')
    signUp(@Body() signUpUserDto: SignUpUserDto) {
        return this.authService.signUp(signUpUserDto);
    }

    @Post('sign-in')
    signIn(@Body() signInUserDto: SignInUserDto) {
        return this.authService.signIn(signInUserDto);
    }

    @Post('refresh-token')
    async refreshAccessToken(@Body('refresh_token') refreshToken: string) {
        return this.authService.getNewAccessToken(refreshToken);
    }
}
