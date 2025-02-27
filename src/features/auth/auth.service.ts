import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { SignUpDto } from './auth.dto';
import { PrismaService } from '@libs';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async signUp(data: SignUpDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
      select: { id: true, name: true, email: true },
    });
  }
}
