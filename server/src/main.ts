import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { uploadsDir } from 'config';
import { join } from 'path'
import * as fs from 'fs';
import * as express from 'express'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.useStaticAssets(join(__dirname, '../../..', '/client/build'));

  prepareUploadsDir();

  await app.listen(3000);
}
bootstrap();

function prepareUploadsDir() {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
