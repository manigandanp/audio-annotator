import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TitleService } from './title.service';
import { TitleController } from './title.controller';
import { DatabaseService } from '../database/database.service';
import { AppLoggerMiddleware } from 'src/middleware/request.logger';

@Module({
  controllers: [TitleController],
  providers: [TitleService, DatabaseService],
})
export class TitleModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AppLoggerMiddleware).forRoutes('*')
  }
}
