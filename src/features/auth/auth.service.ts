import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { DatabaseService } from 'modules';
import { SignUpDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: DatabaseService) {}

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
