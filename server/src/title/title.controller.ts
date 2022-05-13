import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { Express } from 'express';
import { TitleService } from './title.service';
import { UpdateTitleDto } from './dto/update-title.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { baseDir, uploadsDir } from 'config';
import { Prisma } from '@prisma/client';
import * as fsExtra from 'fs-extra';
import * as fs from 'fs';
import * as lodash from 'lodash';
import * as path from 'path';

const storageOptions = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
};

// https://github.com/sqlpad/sqlpad/issues/518
BigInt.prototype['toJSON'] = function () {
  return this.toString();
};

@Controller('api/titles')
export class TitleController {
  constructor(private readonly titleService: TitleService) {}

  @UseInterceptors(FileInterceptor('file', storageOptions))
  @Post()
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createTitleDto,
  ) {
    let { projectName, titleName, projectId, fileSize, transcription } =
      createTitleDto;

    let soruceFilePath = `${baseDir}/${projectName
      .replace(/\s/g, '_')
      .toLowerCase()}/${path.parse(titleName).name}/${titleName}`;

    let data = {
      projectId: projectId,
      sourceFilename: titleName,
      sourceFilePath: soruceFilePath,
      sourceFileSize: parseInt(fileSize),
      refTranscription: transcription,
    } as Prisma.TitleUncheckedCreateInput;

    fsExtra.moveSync(`${file.path}`, soruceFilePath, { overwrite: true });
    let response = await this.titleService.create(data);
    return { projectName: projectName, ...response };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    let titlesWithSegments = await this.titleService.findOne(id);
    return {
      ...lodash.omit(titlesWithSegments, ['project']),
      projectName: titlesWithSegments.project.name,
    };
  }

  @Get()
  async findAll() {
    let titlesWithProject = await this.titleService.findAll();
    return titlesWithProject.map((t) => {
      return {
        ...lodash.omit(t, ['project', '_count']),
        ...{
          projectId: t.project.id,
          projectName: t.project.name,
          segments: t._count.segments,
        },
      };
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTitleDto: UpdateTitleDto) {
    return this.titleService.update(id, updateTitleDto);
  }

  @Delete()
  remove(@Query('sourceFilePath') sourceFilePath: string) {
    if (fs.existsSync(sourceFilePath)) fsExtra.removeSync(sourceFilePath);
    return this.titleService.remove(sourceFilePath);
  }
}