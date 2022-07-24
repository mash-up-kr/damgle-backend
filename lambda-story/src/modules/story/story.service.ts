import { Injectable } from '@nestjs/common';
// import { Story } from '@damgle/models';

type Story = any;

@Injectable()
export class StoryService {
  constructor() {}

  async createStory() {
    return true;
  }

  async getStoryOfId(id: string): Promise<Story> {
    return true;
  }

  async getStoriesOfMine(): Promise<Story[]> {
    return [];
  }

  async getStoriesForIds(ids: string[]): Promise<Story[]> {
    return [];
  }
}
