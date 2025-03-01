import { plainToInstance } from 'class-transformer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { SignInInterface } from './auth.interface';
import { DatabaseService, Scrypt } from 'modules';
import { SignInDto, SignUpDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: DatabaseService,
    private readonly scrypt: Scrypt,
  ) {}

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
}
