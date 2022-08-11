import { Report, ReportDocument } from '@damgle/models';
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

  async reportStory({
    userNo,
    storyId,
  }: {
    userNo: number;
    storyId: string;
  }): Promise<StoryResponseDto> {
    const session = await this.connection.startSession();
    session.startTransaction();

    const story = await this.storyService.getStoryOfId(storyId);
    if (story.reports.find(report => report.userNo === userNo)) {
      return story;
    }

    const report = new this.reportModel({ userNo, storyId });
    await report.save();
    const storyUpdated = await this.storyService.updateStory(
      storyId,
      {
        $set: { reports: [...story.reports, { userNo, createdAt: report.createdAt }] },
      },
      session
    );

    await session.commitTransaction();
    await session.endSession();
    return storyUpdated;
  }

  async cancelReportStory({
    userNo,
    storyId,
  }: {
    userNo: number;
    storyId: string;
  }): Promise<StoryResponseDto> {
    const session = await this.connection.startSession();
    session.startTransaction();

    const story = await this.storyService.getStoryOfId(storyId);
    if (!story.reports.find(report => report.userNo === userNo)) {
      return story;
    }

    await this.reportModel.deleteOne({ userNo, storyId });
    const storyUpdated = await this.storyService.updateStory(
      storyId,
      {
        $set: { reports: story.reports.filter(report => report.userNo !== userNo) },
      },
      session
    );

    await session.commitTransaction();
    await session.endSession();
    return storyUpdated;
  }
}
