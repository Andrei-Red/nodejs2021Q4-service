const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

type TConfig = {
    PORT: string;
    NODE_ENV:string;
    MONGO_CONNECTION_STRING: string;
    JWT_SECRET_KEY: string;
    AUTH_MODE: boolean | string;
    LOGGING_LEVEL: string;

    POSTGRES_HOST: string;
    POSTGRES_PORT: string;
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_DB: string;
}

export const config: TConfig = {
    PORT: process.env.PORT as string,
    NODE_ENV: process.env.PORT as string,
    MONGO_CONNECTION_STRING: process.env.PORT as string,
    JWT_SECRET_KEY: process.env.PORT as string,
    AUTH_MODE: process.env.PORT as string,
    LOGGING_LEVEL: process.env.LOGGING_LEVEL as string,

    POSTGRES_HOST: process.env.POSTGRES_HOST as string,
    POSTGRES_PORT: process.env.POSTGRES_PORT as string,
    POSTGRES_USER: process.env.POSTGRES_USER as string,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD as string,
    POSTGRES_DB: process.env.POSTGRES_DB as string,
} as TConfig

