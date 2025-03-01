import { Global, Module } from '@nestjs/common';

import { PinoLoggerService } from './logger';

@Global()
@Module({
  providers: [PinoLoggerService],
  exports: [PinoLoggerService],
})
export class LoggerModule {}
