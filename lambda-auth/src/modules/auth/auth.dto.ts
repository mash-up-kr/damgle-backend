import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class AuthResponse {
  @IsString()
  @ApiProperty()
  nickname: string;

  @IsNumber()
  @ApiProperty()
  userNo: number;

  @IsBoolean()
  @ApiProperty()
  notification: boolean;

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

  @IsBoolean()
  @ApiProperty({ default: false })
  notification: boolean;
}

export class SignUpResult extends AuthResponse { }

export class SignInPayload {
  @IsNumber()
  @ApiProperty()
  userNo: number;

  @IsString()
  @ApiProperty()
  refreshToken: string;
}

export class SignInResult extends AuthResponse { }
