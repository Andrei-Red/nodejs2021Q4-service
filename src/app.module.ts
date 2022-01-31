import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/user.model';
import { BoardModule } from './board/board.module';
import { TaskModule } from './task/task.module';
import { Board } from './board/board.model';
import { Task } from './task/task.model';
import { LoginModule } from './login/login.module';


@Module({
  imports: [ConfigModule.forRoot({envFilePath: '.env'}), TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: true,
    entities: [User, Board, Task],
    migrations: [],
    cli: {
      entitiesDir: './src/entities/',
      migrationsDir: './src/migrations/',
    },
  }), BoardModule, TaskModule, UsersModule, LoginModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

