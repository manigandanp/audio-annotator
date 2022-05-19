import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { uploadsDir } from 'config';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  prepareUploadsDir();

  await app.listen(3000);
}
bootstrap();

function prepareUploadsDir() {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
