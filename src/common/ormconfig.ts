import { ConnectionOptions } from 'typeorm';
import {  config as configE } from './config';

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
} = configE;

const config: ConnectionOptions = {
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
};

export default config;