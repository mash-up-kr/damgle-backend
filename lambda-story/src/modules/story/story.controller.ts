import { AuthorizedRequest, JwtAuthGuard } from '@damgle/utils';
import {
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  Req,
  Query,
  Delete,
  Body,
  Logger,
} from '@nestjs/common';
import { StoryOfMineQueryRequestDto, StoryQueryRequestDto } from './dto/story-query.dto';
import { StoryListResponseDto } from './dto/story-list.dto';
import { StoryCreationRequestDto, StoryResponseDto } from './dto/story.dto';
import { Docs } from './story.docs';
import { StoryService } from './story.service';
import { ReactToStoryReqeustBodyDto, StoryIdReqeustParamDto } from './dto/react.dto';
import { Log } from '../../core/status-logger';

const DEFAULT_QUERY_SIZE = 300;

@Controller()
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @Post('/')
  @UseGuards(JwtAuthGuard)
  @Log()
  @Docs.createStory('새로운 담글을 올립니다.')
  async createStory(
    @Req() req: AuthorizedRequest,
    @Body() dto: StoryCreationRequestDto
  ): Promise<StoryResponseDto> {
    return await this.storyService.createStory(req.user, dto);
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  @Docs.getStoriesOfMine('내 담글들을 조회합니다.')
  @Log()
  async getStoriesOfMine(
    @Req() req: AuthorizedRequest,
    @Query() dto: StoryOfMineQueryRequestDto
  ): Promise<StoryListResponseDto> {
    return await this.storyService.getStoriesOfMine(req.user, {
      size: Number(dto.size || DEFAULT_QUERY_SIZE),
      startFromStoryId: dto.startFromStoryId || null,
    });
  }

  @Get('/feed')
  @UseGuards(JwtAuthGuard)
  @Docs.getStoryFeeds('담글을 위치 범위를 지정하여 조회합니다.')
  @Log()
  async getStoryFeeds(
    @Req() req: AuthorizedRequest,
    @Query() dto: StoryQueryRequestDto
  ): Promise<StoryListResponseDto> {
    return await this.storyService.getStoryFeeds(req.user, {
      ...dto,
      size: Number(dto.size || DEFAULT_QUERY_SIZE),
      startFromStoryId: dto.startFromStoryId || null,
    });
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @Docs.getStoryOfId('담글을 조회합니다.')
  @Log()
  async getStoryOfId(
    @Req() req: AuthorizedRequest,
    @Param('id') id: string
  ): Promise<StoryResponseDto> {
    return await this.storyService.getStoryOfId(req.user, id);
  }

  @Post('/react/:storyId')
  @UseGuards(JwtAuthGuard)
  @Docs.reactToStory('담글에 리액션을 남깁니다. (type: angry, amazing, sad, best, like)')
  @Log()
  async reactToStory(
    @Req() req: AuthorizedRequest,
    @Body() { type }: ReactToStoryReqeustBodyDto,
    @Param() { storyId }: StoryIdReqeustParamDto
  ): Promise<StoryResponseDto> {
    return await this.storyService.reactToStory(req.user, { storyId, type });
  }

  @Delete('/react/:storyId')
  @UseGuards(JwtAuthGuard)
  @Docs.removeReactionOfStory('담글에 리엑션을 제거합니다.')
  @Log()
  async removeReactionOfStory(
    @Req() req: AuthorizedRequest,
    @Param() { storyId }: StoryIdReqeustParamDto
  ): Promise<StoryResponseDto> {
    return await this.storyService.removeReactionFromStory(req.user, { storyId });
  }
}
