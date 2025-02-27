import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as express from 'express';

import { AppModule } from './app.module';

async function main() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.use(express.json());
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  await app.listen(4101);
}

main();
