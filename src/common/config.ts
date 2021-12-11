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
}

export const config: TConfig = {
    PORT: process.env.PORT as string,
    NODE_ENV: process.env.PORT as string,
    MONGO_CONNECTION_STRING: process.env.PORT as string,
    JWT_SECRET_KEY: process.env.PORT as string,
    AUTH_MODE: process.env.PORT as string,
} as TConfig

