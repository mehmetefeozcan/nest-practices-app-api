import { Module } from '@nestjs/common';
import { DatabaseModule, LoggerModule, ScryptModule, JWTModule } from 'common';
import { GeneralModule, AuthModule } from 'modules';

@Module({
  imports: [DatabaseModule, LoggerModule, GeneralModule, AuthModule, ScryptModule, JWTModule],
})
export class AppModule {}
