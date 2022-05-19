import { Body, Injectable } from '@nestjs/common';
import axios from 'axios';
import { segmenter } from 'config';
import {
  SampleSegmenterRequestDto,
  SilenceSegmenterRequestDto,
} from './dto/segmenter.dto';

@Injectable()
export class SegmenterClientService {
  async silenceSegmenter(@Body() params: SilenceSegmenterRequestDto) {
    return await axios.post(segmenter.sileceSegmenterUrl, params);
  }

  async sampleSegmenter(@Body() params: SampleSegmenterRequestDto) {
    return await axios.post(segmenter.sampleSegmenterUrl, params);
  }
}
