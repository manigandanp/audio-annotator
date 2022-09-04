import { Injectable } from '@nestjs/common';
import { SegmenterClientService } from 'src/segmenter-client/segmenter-client.service';
import {
  SamplesSegmenterClientDto,
  SilenceSegmenterClientDto,
  SegmenterClientDto,
} from './dto/create-segment.dto';
import { segmenter as config } from 'config';
import {
  SilenceSegmenterRequestDto,
  SampleSegmenterRequestDto,
} from 'src/segmenter-client/dto/segmenter.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import * as _ from 'lodash';
import { TitleService } from 'src/title/title.service';
import { UpdateTitleDto } from 'src/title/dto/update-title.dto';

@Injectable()
export class SegmentService {
  constructor(
    private segmenterClient: SegmenterClientService,
    private db: DatabaseService,
    private titleService: TitleService,
  ) { }

  private formatSegments(response: any, dto: SegmenterClientDto) {
    return response.segments
      .map((o) => _.mapKeys(o, (v, k) => _.camelCase(k)))
      .map((o) => _.omit(o, 'signal'))
      .map((o) => {
        return { ...o, titleId: dto.sourceId };
      }) as Prisma.SegmentUncheckedCreateInput[];
  }

  async createSilenceSegments(dto: SilenceSegmenterClientDto) {
    let silenceSegmenterObj = {
      project: dto.projectName,
      source_file_path: dto.sourceFilePath,
      trim_threshold: dto.trimThreshold || config.trimThreshold,
      silence_threshold: dto.silenceThreshold || config.sileceThreshold,
    } as SilenceSegmenterRequestDto;
    // TODO - Refactor
    // https://stackoverflow.com/questions/61449446/how-to-use-nestjs-to-get-data-from-3rd-party-api
    let response = await this.segmenterClient
      .silenceSegmenter(silenceSegmenterObj)
      .then((res) => res.data);

    let segments: Prisma.SegmentUncheckedCreateInput[] = this.formatSegments(
      response,
      dto,
    );

    await this.db.segment.createMany({ data: segments });
    let updatedTitle = await this.titleService.update(dto.sourceId, {
      sourceDuration: response.source_duration,
      sampleRate: response.sample_rate,
    } as UpdateTitleDto);

    return updatedTitle;
  }

  async createSamplesSegments(dto: SamplesSegmenterClientDto) {
    let samplesSegmenterObj = {
      project: dto.projectName,
      source_file_path: dto.sourceFilePath,
      trim_threshold: dto.trimThreshold,
      start_sample: dto.startSample,
      end_sample: dto.endSample,
    } as SampleSegmenterRequestDto;

    let response = await this.segmenterClient
      .sampleSegmenter(samplesSegmenterObj)
      .then((res) => res.data);

    let segment: Prisma.SegmentUncheckedCreateInput = this.formatSegments(
      response,
      dto,
    )[0];

    let where = dto.id ? { id: dto.id } : { filename: segment.filename };

    return this.db.segment.upsert({
      where: where,
      create: { ...segment, titleId: dto.titleId },
      update: { ...segment, titleId: dto.titleId },
    });
  }

  findAll(titleId?: string) {
    console.log(titleId)
    if (titleId) return this.db.segment.findMany({ where: { titleId: titleId } });
    else return this.db.segment.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} segment`;
  }

  // update(id: number, updateSegmentDto: UpdateSegmentDto) {
  //   return `This action updates a #${id} segment`;
  // }

  remove(segmentFilePath: string) {
    return this.db.segment.delete({
      where: { fileAbsolutePath: segmentFilePath },
    });
  }
}
