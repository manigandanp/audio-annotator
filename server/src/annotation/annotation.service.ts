import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { UpdateAnnotationDto } from './dto/update-annotation.dto';

@Injectable()
export class AnnotationService {
  constructor(private db: DatabaseService) { }

  create(dto: Prisma.AnnotationUncheckedCreateInput) {
    return this.db.annotation.upsert({
      where: { segmentId: dto.segmentId },
      create: { ...dto },
      update: { ...dto },
    });
  }

  findAll() {
    return `This action returns all annotation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} annotation`;
  }

  update(id: Prisma.AnnotationWhereUniqueInput, updateAnnotationDto: UpdateAnnotationDto) {
    return this.db.annotation.update({ where: id, data: updateAnnotationDto })
  }

  remove(id: number) {
    return `This action removes a #${id} annotation`;
  }
}
