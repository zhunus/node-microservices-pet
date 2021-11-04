import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { randomBytes } from 'crypto';
import axios from 'axios';

interface Comment {
  id: string;
  content: string;
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
    const comment = { id, content };
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
      },
    });

    return commentsByPostId[postId];
  }
}
