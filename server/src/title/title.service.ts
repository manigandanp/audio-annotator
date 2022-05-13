import { Injectable } from '@nestjs/common';
import { prisma, Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { UpdateTitleDto } from './dto/update-title.dto';

@Injectable()
export class TitleService {
  constructor(private db: DatabaseService) {}

  create(data: Prisma.TitleUncheckedCreateInput) {
    return this.db.title.create({ data });
  }

  findAll() {
    return this.db.title.findMany({
      include: { project: true, _count: { select: { segments: true } } },
    });
    // return [
    //   {
    //     id: 'd659ef83-6654-496d-8ac2-b0b56d70aa94',
    //     projectId: 'fcdee617-feb4-4864-a653-f37cc0505242',
    //     project: 'Ponniyin Selvan',
    //     fileSize: 72,
    //     duration: 1.23,
    //     segments: 190,
    //     title: 'Tampflex',
    //   },
    //   {
    //     id: '26c8c101-8af8-4bbc-be68-d13500c22818',
    //     projectId: '8a7af21f-917d-4470-9a3d-6d8a719f2930',
    //     project: 'English Audios',
    //     fileSize: 115,
    //     duration: 3.13,
    //     segments: 102,
    //     title: 'Veribet',
    //   },
    //   {
    //     id: '807e79b3-07f3-4f61-b154-9540dd2d4df4',
    //     projectId: 'c17b6959-6e02-404b-a0ea-e1f98b69de32',
    //     project: 'English Audios',
    //     fileSize: 125,
    //     duration: 3.28,
    //     segments: 120,
    //     title: 'Bigtax',
    //   },
    //   {
    //     id: '928c1c23-6dd6-4745-a1c6-06cb5c913986',
    //     projectId: 'a71d8d55-ee2f-4468-bb7a-2758e0f9d236',
    //     project: 'English Audios',
    //     fileSize: 194,
    //     duration: 3.91,
    //     segments: 146,
    //     title: 'Tempsoft',
    //   },
    // ];
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
      include: { _count: { select: { segments: true } } },
    });
  }

  remove(sourceFilePath: string) {
    return this.db.title.delete({
      where: { sourceFilePath: sourceFilePath },
    });
  }
}