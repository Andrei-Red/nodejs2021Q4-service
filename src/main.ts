import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initDB } from './helpers/createAdmin';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';


async function bootstrap() {
  let app;
  const nestMode = process.env['USE_FASTIFY'];

  if(nestMode) {
    app = await NestFactory.create(AppModule);
  } else {
    app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter()
    );
  }

  app.enableCors()
  await app.listen(process.env.PORT || 4001, () => {
    initDB();
  });
  console.log(`App is running on http://localhost:${process.env.PORT}`);
}
bootstrap();




