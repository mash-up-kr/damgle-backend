import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { StoryResponseDto } from './story.dto';

export class StoryListResponseDto {
  @ApiProperty({ type: () => [StoryResponseDto] })
  stories: StoryResponseDto[];

  @ApiProperty()
  @IsNumber()
  size: number;
}
