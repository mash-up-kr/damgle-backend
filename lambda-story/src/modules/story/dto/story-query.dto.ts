import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class StoryQueryRequestDto {
  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: '위 바운드' })
  top: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: '아래 바운드' })
  bottom: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: '왼쪽 바운드' })
  left: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: '오른쪽 바운드' })
  right: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: '가져올 갯수를 지정합니다.', default: 300, required: false })
  size?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '검색을 시작할 storyId를 지정합니다',
    default: null,
    required: false,
  })
  startFromStoryId?: string;
}

export class StoryOfMineQueryRequestDto {
  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: '가져올 갯수를 지정합니다.', default: 300, required: false })
  size?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '검색을 시작할 storyId를 지정합니다',
    default: null,
    required: false,
  })
  startFromStoryId?: string;
}
