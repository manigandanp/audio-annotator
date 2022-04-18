import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProjectService {
  constructor(private db: DatabaseService) {}

  create(createProjectDto: Prisma.ProjectCreateInput) {
    return this.db.project.create({ data: createProjectDto });
  }

  findAll() {
    return this.db.project.findMany();
  }

  findOne(id: Prisma.ProjectWhereUniqueInput) {
    return this.db.project.findUnique({ where: id });
  }

  update(id: Prisma.ProjectWhereUniqueInput, name: Prisma.ProjectUpdateInput) {
    return this.db.project.update({ where: id, data: name });
  }

  remove(id: Prisma.ProjectWhereUniqueInput) {
    return this.db.project.delete({ where: id });
  }
}
