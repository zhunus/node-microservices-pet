import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentsController } from './comments/comments.controller';
import { EventsController } from './events/events.controller';

@Module({
  imports: [],
  controllers: [AppController, CommentsController, EventsController],
  providers: [AppService],
})
export class AppModule {}
