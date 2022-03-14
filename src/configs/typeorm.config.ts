import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { dbConfig } from 'config-types/db-config';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.RDS_HOSTNAME || dbConfig.host,
  port: Number(process.env.RDS_PORT) || dbConfig.port,
  username: process.env.RDS_USERNAME || dbConfig.username,
  password: process.env.RDS_PASSWORD || dbConfig.password,
  database: process.env.RDS_DB_NAME || dbConfig.database,
  synchronize: dbConfig.synchronize,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
};
