import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SegmentService } from './segment.service';
import {
  SilenceSegmenterClientDto,
  SamplesSegmenterClientDto,
} from './dto/create-segment.dto';
import * as fsExtra from 'fs-extra';
import * as fs from 'fs';
import * as lodash from 'lodash';

@Controller('api/segments')
export class SegmentController {
  constructor(private readonly segmentService: SegmentService) {}

  @Post('silence')
  async silence(@Body() silenceDto: SilenceSegmenterClientDto) {
    let updatedTitle = await this.segmentService.createSilenceSegments(
      silenceDto,
    );
    return {
      ...lodash.omit(updatedTitle, ['_count']),
      segments: updatedTitle._count.segments,
    };
  }

  @Post('samples')
  async samples(@Body() sampleDto: SamplesSegmenterClientDto) {
    let updatedSegment = await this.segmentService.createSamplesSegments(
      sampleDto,
    );
    return updatedSegment;
  }

  @Get()
  findAll() {
    return this.segmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.segmentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSegmentDto: any) {
    return 'this.segmentService.update(id, updateSegmentDto);';
  }

  @Delete()
  remove(@Query('segmentFilePath') segmentFilePath: string) {
    if (fs.existsSync(segmentFilePath)) fsExtra.removeSync(segmentFilePath);
    return this.segmentService.remove(segmentFilePath);
  }
}
