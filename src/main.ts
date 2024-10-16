import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from "helmet";


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet())
  // app.enableCors({
  //   origin: "http://localhost:4000"
  // })
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(4000);
}
bootstrap();
