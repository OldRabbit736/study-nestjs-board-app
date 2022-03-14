import * as config from 'config';

export type DbConfig = {
  type: 'mysql' | 'postgres';
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
};

export const dbConfig: DbConfig = config.get('db');
