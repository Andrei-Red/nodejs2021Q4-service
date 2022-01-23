export default {
  type: 'postgres',
  host: process.env['POSTGRES_HOST'],
  port: process.env['POSTGRES_PORT'],
  database: process.env['POSTGRES_DB'],
  username: process.env['POSTGRES_USER'],
  password: process.env['POSTGRES_PASSWORD'],
  synchronize: false,
  migrationsRun: true,
  entities: ['./src/entities/*.ts'],
  migrations: ['./src/migrations/*.ts'],
  cli: {
    entitiesDir: './src/entities/',
    migrationsDir: './src/migrations/',
  },
};
