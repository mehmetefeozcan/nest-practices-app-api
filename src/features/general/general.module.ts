import { Module } from '@nestjs/common';
import { GeneralController } from './general.controller';

@Module({
  controllers: [GeneralController],
})
export class GeneralModule {}
