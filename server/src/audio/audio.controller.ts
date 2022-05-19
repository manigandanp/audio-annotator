import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Query,
  Delete,
  StreamableFile,
  Response,
} from '@nestjs/common';
import { AudioService } from './audio.service';
import { createReadStream } from 'fs';
import * as path from 'path';

@Controller('audio')
export class AudioController {
  constructor(private readonly audioService: AudioService) {}

  // @Post()
  // create(@Body() createAudioDto: CreateAudioDto) {
  //   return this.audioService.create(createAudioDto);
  // }

  // @Get()
  // findAll() {
  //   return this.audioService.findAll();
  // }

  @Get()
  findOne(
    @Response({ passthrough: true }) res,
    @Query('path') audioPath: string,
  ) {
    const filename = path.basename(audioPath);

    res.set({
      'Content-Type': 'audio/wav',
      'Content-Disposition': `inline; filename=${filename}`,
    });
    const file = createReadStream(path.resolve(audioPath));
    return new StreamableFile(file);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAudioDto: UpdateAudioDto) {
  //   return this.audioService.update(+id, updateAudioDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.audioService.remove(+id);
  // }
}
