import { CookieOptions } from 'express';
import moment from 'moment';
const { ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN } = process.env;

const accessTokenCookieOptions: CookieOptions = {
  expires: moment().add(ACCESS_TOKEN_EXPIRES_IN, 'minutes').toDate(),
  maxAge: parseInt(ACCESS_TOKEN_EXPIRES_IN!) * 60 * 1000,
  httpOnly: true,
  secure: true,
  sameSite: 'none',
};
const refreshTokenCookieOptions: CookieOptions = {
  expires: moment().add(REFRESH_TOKEN_EXPIRES_IN, 'minutes').toDate(),
  maxAge: parseInt(REFRESH_TOKEN_EXPIRES_IN!) * 24 * 60 * 60 * 1000,
  httpOnly: true,
  secure: true,
  sameSite: 'none',
};

export { accessTokenCookieOptions, refreshTokenCookieOptions };
