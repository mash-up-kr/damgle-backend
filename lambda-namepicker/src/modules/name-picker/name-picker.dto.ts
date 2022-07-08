import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class PickNamePayload {
  @IsString()
  @ApiProperty()
  adjective: string;

  @IsString()
  @ApiProperty()
  noun: string;
}

export class NameResult {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  adjective: string;

  @IsString()
  @ApiProperty()
  noun: string;

  @IsNumber()
  @ApiProperty()
  nth: number;
}
