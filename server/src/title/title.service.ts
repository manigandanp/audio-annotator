import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { UpdateTitleDto } from './dto/update-title.dto';

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
    return this.db.title.delete({
      where: { sourceFilePath: sourceFilePath },
    });
  }
}
