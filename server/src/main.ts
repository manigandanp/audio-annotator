import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import {uploadsDir} from 'congig'
import * as uploader from 'express-fileupload'
import * as fs from 'fs'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.use(uploader())

  prepareUploadsDir()
  
  await app.listen(3000);
}
bootstrap();

function prepareUploadsDir() {fs.mkdirSync(uploadsDir, { recursive: true })}
