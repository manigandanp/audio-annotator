import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AnnotationService } from './annotation.service';
import { CreateAnnotationDto } from './dto/create-annotation.dto';
import { UpdateAnnotationDto } from './dto/update-annotation.dto';

@Controller('api/annotations')
export class AnnotationController {
  constructor(private readonly annotationService: AnnotationService) { }

  @Post()
  create(@Body() createAnnotationDto: CreateAnnotationDto) {
    return this.annotationService.create(createAnnotationDto as Prisma.AnnotationUncheckedCreateInput);
  }

  @Get()
  findAll() {
    return this.annotationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.annotationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAnnotationDto: UpdateAnnotationDto,
  ) {
    return this.annotationService.update({ id }, updateAnnotationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.annotationService.remove(+id);
  }
}
