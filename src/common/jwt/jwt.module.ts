import { Global, Module } from '@nestjs/common';
import { JWT } from './jwt';

@Global()
@Module({
  providers: [JWT],
  exports: [JWT],
})
export class JWTModule {}
