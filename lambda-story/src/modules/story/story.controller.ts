import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { Docs } from './story.docs';
import { StoryService } from './story.service';

@Controller()
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @Post('/')
  @Docs.createStory('새로운 담글을 올립니다.')
  async createStory() {
    return await this.storyService.createStory();
  }

  @Get('/:id')
  @Docs.getStoryOfId('담글을 조회합니다.')
  async getStoryOfId(@Param('id') id: string) {
    return await this.storyService.getStoryOfId(id);
  }

  @Get('/me')
  @Docs.getStoriesOfMine('내 담글들을 조회합니다.')
  async getStoriesOfMine() {
    return await this.storyService.getStoriesOfMine();
  }

  @Post('/for-ids')
  @Docs.getStoriesForIds('아이디로 담글 여러개를 조회합니다.')
  async getStoriesForIds(@Body('ids') ids: string[]) {
    return await this.storyService.getStoriesForIds(ids);
  }
}
