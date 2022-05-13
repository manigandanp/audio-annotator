import { Module } from '@nestjs/common';
import { AnnotationService } from './annotation.service';
import { AnnotationController } from './annotation.controller';
import { DatabaseService } from 'src/database/database.service';

@Module({
  controllers: [AnnotationController],
  providers: [AnnotationService, DatabaseService]
})
export class AnnotationModule {}
