import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ProjectModule } from './project/project.module';
import { TitleModule } from './title/title.module';

@Module({
  imports: [DatabaseModule, ProjectModule, TitleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
