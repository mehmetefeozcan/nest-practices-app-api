import { Module } from '@nestjs/common';
import { PrismaService } from './libs';
import { AuthModule } from 'features/auth/auth.module';

@Module({
  providers: [PrismaService],
  imports: [AuthModule],
})
export class AppModule {}
