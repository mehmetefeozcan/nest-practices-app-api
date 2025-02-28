import { Controller, All, HttpCode } from '@nestjs/common';

@Controller()
export class GeneralController {
  @All('/')
  @HttpCode(200)
  checkHealth() {
    return 'OK';
  }
}
