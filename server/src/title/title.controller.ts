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
  StreamableFile,
  Response,
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
import * as path from 'path';
import * as archiver from 'archiver';

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
  constructor(private readonly titleService: TitleService) { }

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
  findOne(@Param('id') id: string) {
    return this.titleService.findOne(id);
  }

  @Get()
  findAll() {
    return this.titleService.findAll();
  }

  @Get('download/:id')
  async exportTitle(
    @Response({ passthrough: true }) res,
    @Param('id') id: string,
  ) {
    const exportDir = `${baseDir}/downloads/`;
    const title = await this.titleService.findOne(id);
    const archive = archiver('tar', { gzip: true });
    const titleFullPath = path.parse(title.sourceFilePath);
    const titlePath = titleFullPath.dir;
    const titleName = titleFullPath.name;
    fsExtra.removeSync(exportDir);
    fsExtra.ensureDirSync(exportDir);
    const zipFileName = `${titleName}.tar.gz`;
    const compressedFilePath = `${exportDir}/${zipFileName}`;
    const ipFile = fs.createWriteStream(compressedFilePath);
    res.set({
      'Content-Type': 'application/gzip',
      'Content-Disposition': `attachment;filename=${zipFileName}`,
      'x-filename': zipFileName,
      'Access-Control-Expose-Headers': '*',
    });
    archive.append(JSON.stringify(title), { name: `${titleName}.json` });
    archive.directory(titlePath, false);
    archive.pipe(ipFile);
    return archive.finalize().then((d) => {
      const opFile = fs.createReadStream(compressedFilePath);
      return new StreamableFile(opFile);
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTitleDto: UpdateTitleDto) {
    return this.titleService.update(id, updateTitleDto);
  }

  @Delete('/clean/:id')
  clean(@Param('id') id: string) {
    return this.titleService.clean(id)
  }

  @Delete()
  remove(@Query('sourceFilePath') sourceFilePath: string) {
    return this.titleService.remove(sourceFilePath);
  }

}
