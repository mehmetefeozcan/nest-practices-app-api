import { inflateSync } from 'zlib';
import jwt, { SignOptions, JwtPayload } from 'jsonwebtoken';
import { PinoLoggerService } from 'common';

export class JWT {
  constructor(private readonly logger: PinoLoggerService) {}

  private readonly compressedACSPKey = process.env.ACCESS_PRIVATE_KEY_GLIB || '';
  private readonly compressedRSHPKey = process.env.REFRESH_PRIVATE_KEY_GLIB || '';

  private readonly accessPrivateKEY = inflateSync(Buffer.from(this.compressedACSPKey, 'base64')).toString('utf8');
  private readonly refreshPrivateKEY = inflateSync(Buffer.from(this.compressedRSHPKey, 'base64')).toString('utf8');

  signJwt(payload: JwtPayload, key: 'access' | 'refresh', options: SignOptions = {}) {
    const usedKey = key === 'access' ? this.accessPrivateKEY : this.refreshPrivateKEY;

    return jwt.sign(payload, usedKey, {
      ...(options && options),
      algorithm: 'RS256',
    });
  }

  verifyJwt(token: string, key: 'access' | 'refresh') {
    const usedKey = key === 'access' ? this.accessPrivateKEY : this.refreshPrivateKEY;
    try {
      return jwt.verify(token, usedKey) as JwtPayload;
    } catch (error) {
      this.logger.error(`[verifyJwt ERROR]: ${error}`);
      return null;
    }
  }
}
