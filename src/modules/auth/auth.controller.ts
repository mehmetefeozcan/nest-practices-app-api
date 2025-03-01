import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';

import { SignInDto, SignUpDto } from './auth.dto';
import { accessTokenCookieOptions, refreshTokenCookieOptions } from 'utils';
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
  async signIn(@Res() res: Response, @Req() req: Request, @Body() signInDto: SignInDto) {
    const user = await this.authService.signIn(signInDto);

    if (!user) throw new HttpException('Geçersiz kullanıcı', HttpStatus.BAD_REQUEST);

    const { accessToken, refreshToken, sessionUuid } = await this.authService.signToken(user);

    res.cookie('access_token', accessToken, accessTokenCookieOptions);
    res.cookie('refresh_token', refreshToken, refreshTokenCookieOptions);

    return res.status(200).send(user);
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
