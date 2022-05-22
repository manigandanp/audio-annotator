import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ProjectModule } from './project/project.module';
import { TitleModule } from './title/title.module';
import { SegmentModule } from './segment/segment.module';
import { SegmenterClientService } from './segmenter-client/segmenter-client.service';
import { SegmenterClientModule } from './segmenter-client/segmenter-client.module';
import { AudioModule } from './audio/audio.module';
import { AnnotationModule } from './annotation/annotation.module';
import { join } from 'path'
import { ServeStaticModule } from '@nestjs/serve-static'

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../', '/client/build')
    }),
    DatabaseModule, ProjectModule, TitleModule, SegmentModule, SegmenterClientModule, AudioModule, AnnotationModule],
  controllers: [],
  providers: [SegmenterClientService],
})
export class AppModule { }
