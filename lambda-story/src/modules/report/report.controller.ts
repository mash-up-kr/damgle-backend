import { AuthorizedRequest, JwtAuthGuard } from '@damgle/utils';
import { Controller, Delete, Param, Post, Req, UseGuards } from '@nestjs/common';
import { StoryIdReqeustParamDto } from '../story/dto/react.dto';
import { StoryResponseDto } from '../story/dto/story.dto';
import { Docs } from './report.docs';
import { ReportService } from './report.service';

@Controller()
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post('/report/:storyId')
  @UseGuards(JwtAuthGuard)
  @Docs.reportStory('스토리를 신고합니다.')
  async reportStory(
    @Req() req: AuthorizedRequest,
    @Param() { storyId }: StoryIdReqeustParamDto
  ): Promise<StoryResponseDto> {
    return await this.reportService.reportStory(req.user, storyId);
  }

  @Delete('/report/:storyId')
  @UseGuards(JwtAuthGuard)
  @Docs.cancelReportStory('스토리 신고를 철회합니다.')
  async cancelReportStory(
    @Req() req: AuthorizedRequest,
    @Param() { storyId }: StoryIdReqeustParamDto
  ): Promise<StoryResponseDto> {
    return await this.reportService.cancelReportStory(req.user, storyId);
  }
}
