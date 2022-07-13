import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthResponse {
  @IsString()
  @ApiProperty()
  nickname: string;

  @IsString()
  @ApiProperty()
  userNo: number;

  @IsString()
  @ApiProperty()
  accessToken: string;

  @IsString()
  @ApiProperty()
  refreshToken: string;
}

export class SignUpPayload {
  @IsString()
  @ApiProperty()
  nickname: string;
}

export class SignUpResult extends AuthResponse {}

export class SignInPayload {
  @IsString()
  @ApiProperty()
  userNo: number;

  @IsString()
  @ApiProperty()
  refreshToken: string;
}

export class SignInResult extends AuthResponse {}
