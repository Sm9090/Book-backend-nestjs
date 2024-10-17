import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from 'src/auth/dtos/signUp.dto';
import { LoginInDto } from 'src/auth/dtos/LogIn.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.register(signUpDto);
  }
  @Post('/login')
  signIn(@Body() LoginInDto: LoginInDto): Promise<{ token: string }> {
    return this.authService.login(LoginInDto);
  }
}
