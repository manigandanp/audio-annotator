import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as _ from 'lodash';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProjectService {
  constructor(private db: DatabaseService) { }

  create(createProjectDto: Prisma.ProjectCreateInput) {
    return this.db.project.create({ data: createProjectDto });
  }

  findAll() {
    return this.db.project.findMany({
      include: { _count: { select: { titles: true } } },
    });
  }

  findOne(id: Prisma.ProjectWhereUniqueInput, size: number, offset: number) {
    return this.db.project.findUnique({
      where: id,
      select: {
        _count: { select: { titles: true } },
        titles:
        {
          include:
          {
            segments:
            {
              include: { annotation: true }
            }, project: true
          }, skip: offset, take: size
        }
      }
    });
  }

  update(id: Prisma.ProjectWhereUniqueInput, name: Prisma.ProjectUpdateInput) {
    return this.db.project.update({ where: id, data: name });
  }

  remove(id: Prisma.ProjectWhereUniqueInput) {
    return this.db.project.delete({ where: id });
  }

  async summary() {
    const projects = await this.db.project.findMany({
      include: { titles: { include: { segments: { include: { annotation: true } } } } }
    });

    return projects.map(p => (
      {
        project: {
          id: p.id,
          name: p.name,
          createdAt: p.createdAt
        },
        titlesCount: p.titles.length,
        segemntsTotalDuration: _.sum(p.titles.flatMap(t => t.segments.map(s => s.duration))),
        segmentAnnotatedDuration: _.sum(p.titles.flatMap(t => t.segments.filter(s => s.annotation).map(s => s.duration))),
        segmentsTotalCount: _.sum(p.titles.flatMap(t => t.segments.length)),
        segmentsAnnotatedCount: _.sum(p.titles.flatMap(t => t.segments.filter(s => s.annotation).length)),
        segmentsTotalFileSize: _.sum(p.titles.flatMap(t => t.sourceFileSize))
      }))
  }
}
