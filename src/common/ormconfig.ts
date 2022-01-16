import { ConnectionOptions } from 'typeorm';
import { config } from './config';

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
} = config;

const configDB: ConnectionOptions = {
  type: 'postgres',
  synchronize: false,
  host: POSTGRES_HOST,
  port: +`${POSTGRES_PORT}`,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  entities: ['src/entities/*.{ts,js}'],
  logging: false,
  dropSchema: false,
  migrations: ['./src/migration/**/*.{ts,js}'],
  migrationsRun: true,
  cli: {
    migrationsDir: 'src/migration',
  },
};

export default configDB;