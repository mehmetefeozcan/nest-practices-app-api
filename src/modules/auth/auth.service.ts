import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import type { StringValue } from 'ms';
import { v4 as uuidv4 } from 'uuid';

import { SignInInterface } from './auth.interface';
import { DatabaseService, Scrypt, JWT } from 'common';
import { SignInDto, SignUpDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: DatabaseService,
    private readonly scrypt: Scrypt,
    private readonly jwt: JWT,
  ) {}

  private readonly ACCESS_TOKEN_EXPIRES_IN = process.env.ACCESS_TOKEN_EXPIRES_IN || '';
  private readonly REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || '';

  async signUp(data: SignUpDto) {
    const hashedPassword = await this.scrypt.hashPassword(data.password);

    return this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
      select: { id: true, name: true, email: true },
    });
  }

  async signIn(data: SignInDto): Promise<SignInInterface | undefined> {
    const user = await this.prisma.user.findUnique({ where: { email: data.email } });

    if (!user) throw new HttpException('Kullanıcı bulunamadı', HttpStatus.BAD_REQUEST);

    const isOK = await this.scrypt.verifyPassword(data.password, user!.password);
    const signInUser = plainToInstance(SignInInterface, user, { excludeExtraneousValues: true });

    return isOK ? signInUser : undefined;
  }

  async signToken(user: any) {
    const { uuid, name, email } = user;

    const sessionUuid = uuidv4();

    // Sign the access token
    const accessToken = this.jwt.signJwt({ sub: sessionUuid }, 'access', {
      expiresIn: `${this.ACCESS_TOKEN_EXPIRES_IN}m` as StringValue,
    });

    // Sign the refresh token
    const refreshToken = this.jwt.signJwt({ sub: sessionUuid }, 'refresh', {
      expiresIn: `${this.REFRESH_TOKEN_EXPIRES_IN}d` as StringValue,
    });

    // Create a Session
    /*  await redisClient.hSet(`${HASH_PREFIX.USER_SESSION}:${sessionUuid}`, {
      userUuid: uuid,
      name,
      email: email ?? '',
      refreshToken,
    });

    await redisClient.expire(`${HASH_PREFIX.USER_SESSION}:${sessionUuid}`, 60 * 60 * 24 * parseInt(REFRESH_TOKEN_EXPIRES_IN!)); */

    return { accessToken, refreshToken, sessionUuid };
  }
}
