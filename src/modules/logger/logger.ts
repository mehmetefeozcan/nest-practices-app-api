import { Injectable, LoggerService, Scope } from '@nestjs/common';
import pino, { Logger } from 'pino';

const { NODE_ENV } = process.env;

@Injectable({ scope: Scope.DEFAULT })
export class PinoLoggerService implements LoggerService {
  private readonly logger: Logger;

  constructor() {
    this.logger = pino({
      level: NODE_ENV === 'development' ? 'debug' : 'info',
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
        },
      },
    });
  }

  log(message: any) {
    this.logger.info(message);
  }

  error(message: any, trace?: string) {
    this.logger.error(`${message} - Trace: ${trace}`);
  }

  warn(message: any) {
    this.logger.warn(message);
  }

  debug(message: any) {
    this.logger.debug(message);
  }

  verbose(message: any) {
    this.logger.trace(message);
  }
}
