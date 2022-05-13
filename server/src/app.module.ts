import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ProjectModule } from './project/project.module';
import { TitleModule } from './title/title.module';
import { SegmentModule } from './segment/segment.module';
import { SegmenterClientService } from './segmenter-client/segmenter-client.service';
import { SegmenterClientModule } from './segmenter-client/segmenter-client.module';
import { AudioModule } from './audio/audio.module';
import { AnnotationModule } from './annotation/annotation.module';

@Module({
  imports: [DatabaseModule, ProjectModule, TitleModule, SegmentModule, SegmenterClientModule, AudioModule, AnnotationModule],
  controllers: [AppController],
  providers: [AppService, SegmenterClientService],
})
export class AppModule {}
