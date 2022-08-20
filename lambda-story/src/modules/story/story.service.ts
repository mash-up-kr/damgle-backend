import { InvalidObjectIdFormatError, StoryNotFoundError } from '@damgle/errors';
import { assertReactionType, Reaction, ReactionType, Story, StoryDocument } from '@damgle/models';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Types, UpdateQuery } from 'mongoose';
import { StoryQueryRequestDto } from './dto/story-query.dto';
import {
  ReactionSummaryItemResponseDto,
  StoryCreationRequestDto,
  StoryResponseDto,
} from './dto/story.dto';

@Injectable()
export class StoryService {
  constructor(
    @InjectModel(Story.name)
    private readonly storyModel: Model<StoryDocument>
  ) {}

  async createStory(
    user: { userNo: number; nickname: string },
    { content, x, y }: StoryCreationRequestDto
  ): Promise<any> {
    // TODO: 하루에 100개 제한
    const story = new this.storyModel({
      userNo: user.userNo,
      nickname: user.nickname,
      content,
      location: { type: 'Point', coordinates: [x, y] },
      reactions: [],
      reactionOrder: [],
    });
    await story.save();

    return this.transformResponseStory(story);
  }

  async getStoryOfId(id: string): Promise<StoryResponseDto> {
    const story = await this.getStoryDocumentOfId(id);
    return this.transformResponseStory(story);
  }

  async updateStory(
    id: string,
    update: UpdateQuery<StoryDocument>,
    session?: ClientSession
  ): Promise<StoryResponseDto> {
    this.ensuredObjectId(id);
    let updateTask = this.storyModel.findOneAndUpdate({ _id: id }, update, { new: true });

    if (session) {
      updateTask = updateTask.session(session);
    }

    const storyDocumentUpdated = await updateTask.exec();
    if (storyDocumentUpdated == null) {
      throw new StoryNotFoundError({ id });
    }

    return this.transformResponseStory(storyDocumentUpdated);
  }

  async getStoriesOfMine(
    userNo: number,
    {
      size,
      startFromStoryId,
    }: {
      size: number;
      startFromStoryId: string | null;
    }
  ): Promise<any> {
    const findQuery: Record<string, any> = { userNo };
    if (startFromStoryId != null) {
      findQuery._id = { $lt: this.ensuredObjectId(startFromStoryId) };
    }
    const rawStories = await this.storyModel.find(findQuery).limit(size);
    return {
      size,
      stories: rawStories.map(story => this.transformResponseStory(story)),
    };
  }

  async getStoryFeeds({
    bottom,
    left,
    right,
    size,
    startFromStoryId,
    top,
  }: Omit<Required<StoryQueryRequestDto>, 'startFromStoryId'> & {
    startFromStoryId: string | null;
  }): Promise<any> {
    const findQuery: Record<string, any> = {
      location: {
        $geoWithin: {
          $geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [right, bottom],
                [right, top],
                [left, top],
                [left, bottom],
                [right, bottom],
              ],
            ],
          },
        },
      },
    };
    if (startFromStoryId != null) {
      findQuery._id = { $lt: this.ensuredObjectId(startFromStoryId) };
    }

    const rawStories = await this.storyModel.find(findQuery).limit(size);
    return {
      size,
      stories: rawStories.map(story => this.transformResponseStory(story)),
    };
  }

  async reactToStory(
    { userNo, nickname }: { userNo: number; nickname: string },
    { storyId, type }: { storyId: string; type: ReactionType }
  ): Promise<StoryResponseDto> {
    assertReactionType(type);
    const story = await this.getStoryDocumentOfId(storyId);
    const filteredReactions = story.reactions.filter(reaction => {
      return reaction.userNo !== userNo;
    });

    story.reactions = [...filteredReactions, { userNo, nickname, type }];

    if (!story.reactionOrder.includes(type)) {
      story.reactionOrder.push(type);
    }

    await story.save();
    return this.transformResponseStory(story);
  }

  async removeReactionFromStory(
    userNo: number,
    { storyId }: { storyId: string }
  ): Promise<StoryResponseDto> {
    const story = await this.getStoryDocumentOfId(storyId);
    story.reactions = story.reactions.filter(reaction => {
      return reaction.userNo !== userNo;
    });

    await story.save();
    return this.transformResponseStory(story);
  }

  async getStoryDocumentOfId(id: string): Promise<StoryDocument> {
    this.ensuredObjectId(id);
    const story = await this.storyModel.findById(id);
    if (story == null) {
      throw new StoryNotFoundError({ id });
    }
    return story;
  }

  private transformResponseStory({
    content,
    createdAt,
    updatedAt,
    _id,
    userNo,
    nickname,
    location,
    reactions,
    reactionOrder,
    reports,
  }: StoryDocument): StoryResponseDto {
    return {
      content,
      createdAt,
      id: _id,
      reactions,
      reactionSummary: this.toReactionSummary(reactions, reactionOrder),
      updatedAt,
      userNo,
      nickname,
      reports,
      x: location.coordinates[0],
      y: location.coordinates[1],
    };
  }

  private toReactionSummary(
    reactions: Reaction[],
    reactionOrder: ReactionType[]
  ): ReactionSummaryItemResponseDto[] {
    const countByType = this.countReactionByType(reactions);
    return reactionOrder.map(type => {
      return {
        count: countByType[type],
        type,
      };
    });
  }

  private countReactionByType(reactions: Reaction[]): Record<ReactionType, number> {
    const result: Record<ReactionType, number> = {
      amazing: 0,
      angry: 0,
      best: 0,
      like: 0,
      sad: 0,
    };
    for (const { type } of reactions) {
      result[type]++;
    }
    return result;
  }

  private ensuredObjectId(id: string) {
    try {
      return new Types.ObjectId(id);
    } catch (cause) {
      throw new InvalidObjectIdFormatError({ id, cause });
    }
  }
}
