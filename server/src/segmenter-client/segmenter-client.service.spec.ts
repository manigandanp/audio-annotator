import { Test, TestingModule } from '@nestjs/testing';
import { SegmenterClientService } from './segmenter-client.service';

describe('SegmenterClientService', () => {
  let service: SegmenterClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SegmenterClientService],
    }).compile();

    service = module.get<SegmenterClientService>(SegmenterClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
