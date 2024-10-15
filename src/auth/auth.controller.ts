import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
    @Post('/signup')
    signUp(@Body() signUpDto : CreateUserDto): Promise<{token: string}> {
        return this.authService.register(signUpDto)
    }
}
