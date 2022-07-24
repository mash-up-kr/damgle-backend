import { ReactionType } from '@damgle/models';
import { ApiProperty } from '@nestjs/swagger';

export class StoryResponseDto {
  @ApiProperty({ description: '스토리 아이디' })
  id: string;

  @ApiProperty({ description: '유저 번호' })
  userNo: number;

  @ApiProperty({ description: '유저 닉네임' })
  nickname: string;

  @ApiProperty({ description: '경도(longitude)' })
  x: number;

  @ApiProperty({ description: '위도(latitude)' })
  y: number;

  @ApiProperty({ description: '담글 본문' })
  content: string;

  @ApiProperty({ description: '리액션 목록', type: () => [ReactionResponseDto] })
  reactions: ReactionResponseDto[];

  @ApiProperty({ description: '생성 시각(unix time ms)' })
  createdAt: number;

  @ApiProperty({ description: '수정 시각(unix time ms)' })
  updatedAt: number;
}

export class StoryCreationRequestDto {
  @ApiProperty({ description: '경도(longitude)' })
  x: number;

  @ApiProperty({ description: '위도(latitude)' })
  y: number;

  @ApiProperty({ description: '담글 본문' })
  content: string;
}

export class ReactionResponseDto {
  @ApiProperty({ description: '유저 번호' })
  userNo: number;

  @ApiProperty({ description: '유저 닉네임' })
  nickname: string;

  @ApiProperty({
    enum: ReactionType,
    description: '리액션 타입 (angry amaziong sad best like)',
  })
  type: ReactionType;
}
