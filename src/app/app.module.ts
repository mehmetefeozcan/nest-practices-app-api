import { Module } from '@nestjs/common';
import { DatabaseModule, LoggerModule } from 'modules';

@Module({
  imports: [DatabaseModule, LoggerModule],
})
export class AppModule {}
