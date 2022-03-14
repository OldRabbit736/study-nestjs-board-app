import * as config from 'config';

export type JwtConfig = {
  secret: string;
  expiresIn: number;
};

export const jwtConfig: JwtConfig = config.get('jwt');
