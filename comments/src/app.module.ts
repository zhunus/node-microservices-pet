import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  CommentsController,
  EventsController,
} from './comments/comments.controller';

@Module({
  imports: [],
  controllers: [AppController, CommentsController, EventsController],
  providers: [AppService],
})
export class AppModule {}
