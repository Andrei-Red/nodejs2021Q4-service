const { createLogger, transports, format } = require('winston');
require('winston-daily-rotate-file');
const { combine, timestamp, printf } = format;

const levels = {
  0: 'error',
  1: 'warn',
  2: 'info',
  3: 'http',
  4: 'verbose',
  5: 'debug',
  6: 'silly',
};

const myFormat = printf(({ level, message, timestamp, stack }: any) => {
  return `${timestamp} ${level}: ${message || stack}`;
});

const transport = new transports.DailyRotateFile({
  filename: 'logs/application-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  level: 'debug',
});

const logger = createLogger({
  level: 'info',
  format: combine(
    format.colorize(),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    myFormat
  ),
  defaultMeta: { service: 'user-service' },
  transports: [new transports.Console(), transport],
});

module.exports = logger;
