import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post } from '@nestjs/common';
import { SignInDto, SignUpDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  @HttpCode(200)
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('/sign-in')
  @HttpCode(200)
  async signIn(@Body() signInDto: SignInDto) {
    const state = await this.authService.signIn(signInDto);

    if (!state) throw new HttpException('Geçersiz kullanıcı', HttpStatus.BAD_REQUEST);

    return state;
  }

  @Get('/refresh')
  async refresh() {
    return;
  }

  @Get('/me')
  async me() {
    return;
  }
}
