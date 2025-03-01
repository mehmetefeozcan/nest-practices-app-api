import { Module } from '@nestjs/common';
import { DatabaseModule, LoggerModule, ScryptModule } from 'modules';
import { GeneralModule, AuthModule } from 'features';

@Module({
  imports: [DatabaseModule, LoggerModule, GeneralModule, AuthModule, ScryptModule],
})
export class AppModule {}
