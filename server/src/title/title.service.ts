import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { UpdateTitleDto } from './dto/update-title.dto';
import * as fs from 'fs'
import * as fsExtra from 'fs-extra'
import * as path from 'path';

@Injectable()
export class TitleService {
  constructor(private db: DatabaseService) { }

  create(data: Prisma.TitleUncheckedCreateInput) {
    return this.db.title.create({ data, include: { project: true } });
  }

  findAll() {
    return this.db.title.findMany({
      include: { project: true, segments: { include: { annotation: true } } },
    });
  }

  findOne(id: string) {
    return this.db.title.findUnique({
      where: { id },
      include: {
        segments: {
          include: {
            annotation: true,
          },
        },
        project: true,
      },
    });
  }

  update(id: string, updateTitleDto: UpdateTitleDto) {
    return this.db.title.update({
      where: { id },
      data: updateTitleDto,
      include: { segments: true, project: true },
    });
  }

  remove(sourceFilePath: string) {
    if (fs.existsSync(sourceFilePath)) fsExtra.removeSync(path.parse(sourceFilePath).dir)
    return this.db.title.delete({
      where: { sourceFilePath: sourceFilePath },
    });
  }

  async clean(id: string) {
    const title = await this.findOne(id)
    const validSegmentPath = title.segments.map(s => s.filename)
    const titlePath = title.sourceFilePath.replace(title.sourceFilename, '')
    const wavsPath = path.resolve(titlePath, 'wavs')
    fs.readdir(wavsPath, (e, files) => {
      files.forEach(file => {
        if (!validSegmentPath.includes(file)) {
          const fileToRemove = path.resolve(wavsPath, file)
          fsExtra.removeSync(fileToRemove)
        }
      })
      return { err: e }
    })
    return { msg: "Successfully deleted" }
  }
}
