import { Report, ReportDocument } from '@damgle/models';
import { RequestUser } from '@damgle/utils';
import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { StoryResponseDto } from '../story/dto/story.dto';
import { StoryService } from '../story/story.service';

@Injectable()
export class ReportService {
  constructor(
    @InjectModel(Report.name)
    private readonly reportModel: Model<ReportDocument>,
    @InjectConnection() private readonly connection: mongoose.Connection,
    private readonly storyService: StoryService
  ) {}

  async reportStory(user: RequestUser, storyId: string): Promise<StoryResponseDto> {
    const session = await this.connection.startSession();
    session.startTransaction();

    const story = await this.storyService.getStoryOfId(user, storyId);
    if (story.reports.find(report => report.userNo === user.userNo)) {
      return story;
    }

    const report = new this.reportModel({ userNo: user.userNo, storyId });
    await report.save();
    const storyUpdated = await this.storyService.updateStory(
      user,
      storyId,
      {
        $set: { reports: [...story.reports, { userNo: user.userNo, createdAt: report.createdAt }] },
      },
      session
    );

    await session.commitTransaction();
    await session.endSession();
    return storyUpdated;
  }

  async cancelReportStory(user: RequestUser, storyId: string): Promise<StoryResponseDto> {
    const session = await this.connection.startSession();
    session.startTransaction();

    const story = await this.storyService.getStoryOfId(user, storyId);
    if (!story.reports.find(report => report.userNo === user.userNo)) {
      return story;
    }

    await this.reportModel.deleteOne({ userNo: user.userNo, storyId });
    const storyUpdated = await this.storyService.updateStory(
      user,
      storyId,
      {
        $set: { reports: story.reports.filter(report => report.userNo !== user.userNo) },
      },
      session
    );

    await session.commitTransaction();
    await session.endSession();
    return storyUpdated;
  }
}
