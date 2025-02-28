import { Injectable, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as express from 'express';

import { AppModule } from './app.module';
import { PinoLoggerService } from '../modules';
import morgan from 'morgan';

const { PORT } = process.env || 3000;

@Injectable()
export class AppService {
  constructor(private readonly logger: PinoLoggerService) {}

  async start(): Promise<void> {
    this.logger.log('[NETWORK APP]\tSTARTING');
    const app = await NestFactory.create(AppModule, { cors: true, logger: false });

    app.use(morgan('combined'));
    app.use(express.json());
    app.setGlobalPrefix('v1');
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

    await app.listen(PORT!);
  }
}
