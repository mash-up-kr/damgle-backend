import { ReactionType } from '@damgle/models';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ReactToStoryReqeustBodyDto {
  @ApiProperty({
    enum: ReactionType,
    description: '리액션 타입 (angry amaziong sad best like)',
  })
  type: ReactionType;
}

export class StoryIdReqeustParamDto {
  @IsString()
  @ApiProperty({ description: '스토리 아이디' })
  storyId: string;
}
