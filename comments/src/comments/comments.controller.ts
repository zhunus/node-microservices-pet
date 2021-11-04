import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { randomBytes } from 'crypto';

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
  postComment(@Param('id') postId: string, @Body() { content }: CommentDto) {
    const id = randomBytes(4).toString('hex');
    const comment = { id, content };
    if (commentsByPostId[postId]) {
      commentsByPostId[postId].push(comment);
    } else {
      commentsByPostId[postId] = [comment];
    }
    return commentsByPostId[postId];
  }
}
