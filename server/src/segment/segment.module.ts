import { Module } from '@nestjs/common';
import { SegmentService } from './segment.service';
import { SegmentController } from './segment.controller';
import { SegmenterClientService } from 'src/segmenter-client/segmenter-client.service';
import { DatabaseService } from 'src/database/database.service';
import { TitleService } from 'src/title/title.service';

@Module({
  controllers: [SegmentController],
  providers: [
    SegmentService,
    SegmenterClientService,
    DatabaseService,
    TitleService,
  ],
})
export class SegmentModule {}
