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

export const config: TConfig = {} as TConfig

config['PORT'] = process.env.PORT as string;
config['NODE_ENV'] = process.env.PORT as string;
config['MONGO_CONNECTION_STRING'] = process.env.PORT as string;
config['JWT_SECRET_KEY'] = process.env.PORT as string;
config['AUTH_MODE'] = process.env.PORT as string;


// module.exports = {
//   'PORT': process.env.PORT,
//   'NODE_ENV': process.env.NODE_ENV,
//   'MONGO_CONNECTION_STRING': process.env.MONGO_CONNECTION_STRING,
//   'JWT_SECRET_KEY': process.env.JWT_SECRET_KEY,
//   'AUTH_MODE': process.env.AUTH_MODE === 'true'
// };
