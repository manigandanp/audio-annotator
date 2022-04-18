import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
  Req,
} from '@nestjs/common';
import { Express } from 'express';
import { TitleService } from './title.service';
import { CreateTitleDto } from './dto/create-title.dto';
import { UpdateTitleDto } from './dto/update-title.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {uploadsDir} from 'congig'
import { MulterModule } from '@nestjs/platform-express';


const storageOptions = { storage: diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
}) }

// MulterModule.register(storageOptions)

@Controller('titles')
export class TitleController {
  constructor(private readonly titleService: TitleService) {}

  // @UseInterceptors(FileInterceptor('file', storageOptions ))
  @Post()
  async create(
    @Req() req: Express.Request, @Res() res: Express.Response
  ) {
    console.log('first');
    console.log(req.file);
    console.log(req.files);
    // console.log(createTitleDto);

    // let dummy = {} as any;
    // return { data: 'this.titleService.create(dummy)' };
    return {file: "file.filename"}
  }

  @Get()
  findAll() {
    return this.titleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.titleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTitleDto: UpdateTitleDto) {
    return this.titleService.update(+id, updateTitleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.titleService.remove(id);
  }
}


