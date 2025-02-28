import { PinoLoggerService } from 'modules';
import { AppService } from './app';

const logger = new PinoLoggerService();

async function main() {
  const server = new AppService(logger);
  await server.start();
}

main()
  .then(() => {
    logger.log('[NETWORK APP]\tSTARTED');
  })
  .catch((err) => {
    logger.error(`[NETWORK APP]\tNOT STARTED: ${err}`);
    process.exit(1);
  });
