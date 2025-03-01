import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { PinoLoggerService } from '../logger/logger';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private logger = new PinoLoggerService();

  async onModuleInit() {
    await this.$connect();
    this.logger.log('[DATABASE]\t\tSuccessfully connected to the database');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('[DATABASE]\t\tDisconnected to the database');
  }
}
