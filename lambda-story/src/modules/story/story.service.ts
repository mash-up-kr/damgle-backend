import { assertReactionType, ReactionType, Story, StoryDocument } from '@damgle/models';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { StoryCreationRequestDto, StoryResponseDto } from './dto/story.dto';
import { InvalidObjectIdFormatError, StoryNotFoundError, NotSupportedError } from '@damgle/errors';
import { StoryQueryRequestDto } from './dto/story-query.dto';

@Injectable()
export class StoryService {
  constructor(
    @InjectModel(Story.name)
    private readonly storyModel: Model<StoryDocument>
  ) {}

  async createStory(userNo: number, { content, x, y }: StoryCreationRequestDto): Promise<any> {
    // TODO: 하루에 100개 제한
    const story = new this.storyModel({
      userNo,
      content,
      location: { type: 'Point', coordinates: [x, y] },
    });
    await story.save();

    return this.transformResponseStory(story);
  }

  async getStoryOfId(id: string): Promise<StoryResponseDto> {
    const story = await this.storyOf(id);
    return this.transformResponseStory(story);
  }

  async getStoriesOfMine(
    userNo: number,
    {
      size,
      startFromStoryId,
    }: {
      size: number;
      // TODO: 이거 되도록 픽스
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
    userNo: number,
    { storyId, type }: { storyId: string; type: ReactionType }
  ): Promise<StoryResponseDto> {
    assertReactionType(type);
    const story = await this.storyOf(storyId);
    const filteredReactions = story.reactions.filter(reaction => {
      return reaction.userNo !== userNo;
    });

    story.reactions = [...filteredReactions, { userNo, type }];
    await story.save();
    return this.transformResponseStory(story);
  }

  async removeReactionOfStory(
    userNo: number,
    { storyId }: { storyId: string }
  ): Promise<StoryResponseDto> {
    const story = await this.storyOf(storyId);
    story.reactions = story.reactions.filter(reaction => {
      return reaction.userNo !== userNo;
    });

    await story.save();
    return this.transformResponseStory(story);
  }

  async reportStory(...args: any[]): Promise<any> {
    void args;
    throw new NotSupportedError({ service: '담글 신고 기능' });
  }

  private async storyOf(id: string): Promise<StoryDocument> {
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
    location,
    reactions,
  }: StoryDocument): StoryResponseDto {
    return {
      content,
      createdAt,
      id: _id,
      reactions,
      updatedAt,
      userNo,
      x: location.coordinates[0],
      y: location.coordinates[1],
    };
  }

  private ensuredObjectId(id: string) {
    try {
      return new Types.ObjectId(id);
    } catch (cause) {
      throw new InvalidObjectIdFormatError({ id, cause });
    }
  }
}
