import { Global, Module } from '@nestjs/common';
import { Scrypt } from './scrypt';

@Global()
@Module({
  providers: [Scrypt],
  exports: [Scrypt],
})
export class ScryptModule {}
