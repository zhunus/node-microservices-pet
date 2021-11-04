import {
  Body,
  Controller,
  Get,
  Logger,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { randomBytes } from 'crypto';
import axios from 'axios';

interface BusEvent {
  type: string;
  data: Comment;
}

interface Comment {
  id: string;
  content: string;
  status: string;
  postId: string;
}

interface CommentDto {
  content: string;
}

const commentsByPostId: Record<string, Comment[]> = {};

@Controller('posts')
export class CommentsController {
  @Get('/:id/comments')
  getComments(@Param('id') id: string): Comment[] {
    if (!commentsByPostId[id]) {
      throw new NotFoundException('Post is not found');
    }
    return commentsByPostId[id];
  }

  @Post('/:id/comments')
  async postComment(
    @Param('id') postId: string,
    @Body() { content }: CommentDto,
  ) {
    const id = randomBytes(4).toString('hex');
    const comment = { id, content, status: 'pending', postId };
    if (commentsByPostId[postId]) {
      commentsByPostId[postId].push(comment);
    } else {
      commentsByPostId[postId] = [comment];
    }

    await axios.post('http://localhost:4005/events', {
      type: 'CommentCreated',
      data: {
        id,
        content,
        postId,
        status: 'pending',
      },
    });

    return commentsByPostId[postId];
  }
}

@Controller('events')
export class EventsController {
  private readonly logger = new Logger(EventsController.name);

  @Post()
  async getEvent(@Body() event: BusEvent) {
    this.logger.log(`Event occured: ${event.type}`);
    if (event.type === 'CommentModerated') {
      const { id, content, status, postId } = event.data;
      const comments = commentsByPostId[postId];
      const comment = comments.find((c) => c.id === id);
      comment.status = status;
      await axios.post('http://localhost:4005/events', {
        type: 'CommentUpdated',
        data: { id, status, content, postId },
      });
    }
  }
}
