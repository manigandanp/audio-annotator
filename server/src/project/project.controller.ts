import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import * as lodash from 'lodash';

@Controller('api/projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Get()
  async findAll() {
    let projects = await this.projectService.findAll();
    return projects.map((project) => ({
      ...lodash.omit(project, ['_count']),
      titles: project._count.titles,
    }));
  }

  @Get('summary')
  async summary() {
    return this.projectService.summary()
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query('size') size: string = '15', @Query('offset') offset: string = '0') {
    return this.projectService.findOne({ id }, parseInt(size), parseInt(offset));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update({ id }, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove({ id });
  }
}
