import { Injectable } from '@nestjs/common';
// import { Story } from '@damgle/models';

type Story = any;

@Injectable()
export class StoryService {
  constructor() {}

  async createStory(...args: any[]): Promise<any> {
    return;
  }

  async getStoryOfId(id: string): Promise<Story> {
    return;
  }

  async getStoriesOfMine(...args: any[]): Promise<Story> {
    return [];
  }

  async getStoriesForIds(ids: string[]): Promise<Story[]> {
    return [];
  }

  async getStoryFeeds(...args: any[]): Promise<any> {
    return;
  }

  async reactToStory(...args: any[]): Promise<any> {
    return;
  }

  async removeReactionOfStory(...args: any[]): Promise<any> {
    return;
  }

  async reportStory(...args: any[]): Promise<any> {
    return;
  }
}
