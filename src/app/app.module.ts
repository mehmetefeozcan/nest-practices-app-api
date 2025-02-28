import { Module } from '@nestjs/common';
import { DatabaseModule, LoggerModule } from 'modules';
import { GeneralModule, AuthModule } from 'features';

@Module({
  imports: [DatabaseModule, LoggerModule, GeneralModule, AuthModule],
})
export class AppModule {}
