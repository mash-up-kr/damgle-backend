import { InvalidObjectIdFormatError, StoryNotFoundError } from '@damgle/errors';
import { assertReactionType, Reaction, ReactionType, Story, StoryDocument } from '@damgle/models';
import { RequestUser } from '@damgle/utils';
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
    user: RequestUser,
    { content, x, y, address1, address2 }: StoryCreationRequestDto
  ): Promise<any> {
    // TODO: 하루에 100개 제한
    const story = new this.storyModel({
      userNo: user.userNo,
      nickname: user.nickname,
      content,
      address1,
      address2,
      location: { type: 'Point', coordinates: [x, y] },
      reactions: [],
      reactionOrder: [],
    });
    await story.save();

    return this.transformResponseStory(story, user);
  }

  async getStoryOfId(user: RequestUser, id: string): Promise<StoryResponseDto> {
    const story = await this.getStoryDocumentOfId(id);
    return this.transformResponseStory(story, user);
  }

  async updateStory(
    user: RequestUser,
    storyId: string,
    update: UpdateQuery<StoryDocument>,
    session?: ClientSession
  ): Promise<StoryResponseDto> {
    this.ensuredObjectId(storyId);
    let updateTask = this.storyModel.findOneAndUpdate({ _id: storyId }, update, { new: true });

    if (session) {
      updateTask = updateTask.session(session);
    }

    const storyDocumentUpdated = await updateTask.exec();
    if (storyDocumentUpdated == null) {
      throw new StoryNotFoundError({ id: storyId });
    }

    return this.transformResponseStory(storyDocumentUpdated, user);
  }

  async getStoriesOfMine(
    user: RequestUser,
    { size, startFromStoryId }: { size: number; startFromStoryId: string | null }
  ): Promise<any> {
    const findQuery: Record<string, any> = { userNo: user.userNo };
    if (startFromStoryId != null) {
      findQuery._id = { $lt: this.ensuredObjectId(startFromStoryId) };
    }
    const rawStories = await this.storyModel.find(findQuery).sort({ _id: -1 }).limit(size);
    return {
      size: rawStories.length,
      stories: rawStories.map(story => this.transformResponseStory(story, user)),
    };
  }

  async getStoryFeeds(
    user: RequestUser,
    {
      top,
      bottom,
      left,
      right,
      size,
      startFromStoryId,
    }: Omit<Required<StoryQueryRequestDto>, 'startFromStoryId'> & {
      startFromStoryId: string | null;
    }
  ): Promise<any> {
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

    const rawStories = await this.storyModel.find(findQuery).sort({ _id: -1 }).limit(size);
    return {
      size: rawStories.length,
      stories: rawStories.map(story => this.transformResponseStory(story, user)),
    };
  }

  async reactToStory(
    user: RequestUser,
    { storyId, type }: { storyId: string; type: ReactionType }
  ): Promise<StoryResponseDto> {
    assertReactionType(type);
    const story = await this.getStoryDocumentOfId(storyId);
    const filteredReactions = story.reactions.filter(reaction => {
      return reaction.userNo !== user.userNo;
    });

    story.reactions = [
      ...filteredReactions,
      { userNo: user.userNo, nickname: user.nickname, type },
    ];

    if (!story.reactionOrder.includes(type)) {
      story.reactionOrder.push(type);
    }

    await story.save();
    return this.transformResponseStory(story, user);
  }

  async removeReactionFromStory(
    user: RequestUser,
    { storyId }: { storyId: string }
  ): Promise<StoryResponseDto> {
    const story = await this.getStoryDocumentOfId(storyId);
    story.reactions = story.reactions.filter(reaction => {
      return reaction.userNo !== user.userNo;
    });

    await story.save();
    return this.transformResponseStory(story, user);
  }

  async getStoryDocumentOfId(id: string): Promise<StoryDocument> {
    this.ensuredObjectId(id);
    const story = await this.storyModel.findById(id);
    if (story == null) {
      throw new StoryNotFoundError({ id });
    }
    return story;
  }

  private transformResponseStory(
    {
      content,
      createdAt,
      updatedAt,
      _id,
      userNo,
      nickname,
      location,
      address1,
      address2,
      reactions,
      reactionOrder,
      reports,
    }: StoryDocument,
    user?: RequestUser
  ): StoryResponseDto {
    return {
      content,
      createdAt,
      id: _id,
      address1,
      address2,
      // 클라이언트 편의를 위해 서버에서 유저별로 transfrom 하기로 함.
      // TODO: isMine같은 request user context에 종속된 transfrom 제거하기
      isMine: userNo === user?.userNo,
      reactions,
      reactionSummary: this.toReactionSummary(reactions, reactionOrder),
      // 클라이언트 편의를 위해 서버에서 유저별로 transfrom 하기로 함.
      reactionOfMine: reactions.find(reaction => reaction.userNo === user?.userNo) ?? null,
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
