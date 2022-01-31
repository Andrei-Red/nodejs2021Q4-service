import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initDB } from './helpers/createAdmin';




async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 4001, () => {
    initDB();
  });
  console.log(`App is running on http://localhost:${process.env.PORT}`);
}
bootstrap();




