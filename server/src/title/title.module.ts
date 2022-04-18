import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TitleService } from './title.service';
import { TitleController } from './title.controller';
import { DatabaseService } from '../database/database.service';
import { UploaderMiddleware } from 'src/middleware/uploader.middleware';

@Module({
  controllers: [TitleController],
  providers: [TitleService, DatabaseService],
})
export class TitleModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UploaderMiddleware)
      .forRoutes({ path: 'titles', method: RequestMethod.POST });
  }
}
