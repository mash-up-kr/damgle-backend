import { AuthorizedRequest, JwtAuthGuard } from '@damgle/utils';
import { Controller, Get, Post, Param, UseGuards, Req, Query, Delete, Body } from '@nestjs/common';
import { StoryOfMineQueryRequestDto, StoryQueryRequestDto } from './dto/story-query.dto';
import { StoryListResponseDto } from './dto/story-list.dto';
import { StoryCreationRequestDto, StoryResponseDto } from './dto/story.dto';
import { Docs } from './story.docs';
import { StoryService } from './story.service';
import { ReactToStoryReqeustBodyDto, StoryIdReqeustParamDto } from './dto/react.dto';

const DEFAULT_QUERY_SIZE = 300;

@Controller()
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @Post('/')
  @UseGuards(JwtAuthGuard)
  @Docs.createStory('새로운 담글을 올립니다.')
  async createStory(
    @Req() req: AuthorizedRequest,
    @Body() dto: StoryCreationRequestDto
  ): Promise<StoryResponseDto> {
    return await this.storyService.createStory(req.user.userNo, dto);
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  @Docs.getStoriesOfMine('내 담글들을 조회합니다.')
  async getStoriesOfMine(
    @Req() req: AuthorizedRequest,
    @Query() dto: StoryOfMineQueryRequestDto
  ): Promise<StoryListResponseDto> {
    return await this.storyService.getStoriesOfMine(req.user.userNo, {
      size: Number(dto.size || DEFAULT_QUERY_SIZE),
      startFromStoryId: dto.startFromStoryId || null,
    });
  }

  @Get('/feed')
  @Docs.getStoryFeeds('담글을 위치 범위를 지정하여 조회합니다.')
  async getStoryFeeds(@Query() dto: StoryQueryRequestDto): Promise<StoryListResponseDto> {
    return await this.storyService.getStoryFeeds({
      ...dto,
      size: Number(dto.size || DEFAULT_QUERY_SIZE),
      startFromStoryId: dto.startFromStoryId || null,
    });
  }

  @Get('/:id')
  @Docs.getStoryOfId('담글을 조회합니다.')
  async getStoryOfId(@Param('id') id: string): Promise<StoryResponseDto> {
    return await this.storyService.getStoryOfId(id);
  }

  @Post('/react/:storyId')
  @UseGuards(JwtAuthGuard)
  @Docs.reactToStory('담글에 리액션을 남깁니다. (type: angry, amazing, sad, best, like)')
  async reactToStory(
    @Req() req: AuthorizedRequest,
    @Body() { type }: ReactToStoryReqeustBodyDto,
    @Param() { storyId }: StoryIdReqeustParamDto
  ): Promise<StoryResponseDto> {
    return await this.storyService.reactToStory(req.user.userNo, { storyId, type });
  }

  @Delete('/react/:storyId')
  @UseGuards(JwtAuthGuard)
  @Docs.removeReactionOfStory('담글에 리엑션을 제거합니다.')
  async removeReactionOfStory(
    @Req() req: AuthorizedRequest,
    @Param() { storyId }: StoryIdReqeustParamDto
  ): Promise<StoryResponseDto> {
    return await this.storyService.removeReactionOfStory(req.user.userNo, { storyId });
  }

  @Post('/report/:storyId')
  @UseGuards(JwtAuthGuard)
  @Docs.reportStory('스토리를 신고합니다.')
  async reportStory(@Req() req: AuthorizedRequest, @Param() { storyId }: StoryIdReqeustParamDto) {
    await this.storyService.reportStory({
      userNo: req.user.userNo,
      storyId,
    });
    return { accepted: true };
  }
}
