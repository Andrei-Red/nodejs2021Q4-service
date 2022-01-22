import { config } from "../../common/config";
import { levels } from './levelsConst';

const { createLogger, transports, format } = require('winston');
require('winston-daily-rotate-file');

const level: string | undefined = levels[Number(config.LOGGING_LEVEL)]

const transportAll = new transports.DailyRotateFile({
  filename: 'logs/application-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  level: level,
});

const transportError = new transports.DailyRotateFile({
  filename: 'logs/application-ERROR-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  level: 'error',
});


const logger = createLogger({
  level: 'info',
  format: format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [new transports.Console(), transportAll, transportError],
});

module.exports = logger;


// combine(
//   format.colorize(),
//   timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
//   format.errors({ stack: true }),
//   myFormat
// ),