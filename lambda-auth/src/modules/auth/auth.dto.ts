import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class AuthResponse {
  @IsString()
  @ApiProperty({ description: '사용자 닉네임', example: '잠자는 첫번째 오리' })
  nickname: string;

  @IsNumber()
  @ApiProperty({ description: '사용자 번호', example: '5' })
  userNo: number;

  @IsBoolean()
  @ApiProperty({ description: '푸시 알람 활성화 여부', example: 'true', default: false })
  notification: boolean;

  @IsString()
  @ApiProperty({ description: '사용자 Access Token' })
  accessToken: string;

  @IsString()
  @ApiProperty({ description: '사용자 Refresh Token' })
  refreshToken: string;
}

export class SignUpPayload {
  @IsString()
  @ApiProperty({ description: '사용자 닉네임', example: '잠자는 첫번째 오리' })
  nickname: string;

  @IsBoolean()
  @ApiProperty({ description: '푸시 알람 활성화 여부', example: 'true', default: false })
  notification: boolean;
}

export class SignUpResult extends AuthResponse { }

export class SignInPayload {
  @IsNumber()
  @ApiProperty({ description: '사용자 번호', example: '5' })
  userNo: number;

  @IsString()
  @ApiProperty({ description: '사용자 Refresh Token' })
  refreshToken: string;
}

export class SignInResult extends AuthResponse { }

export class UserInfoResponse {
  @IsString()
  @ApiProperty({ description: '사용자 닉네임', example: '잠자는 첫번째 오리' })
  nickname: string;

  @IsNumber()
  @ApiProperty({ description: '사용자 번호', example: '5' })
  userNo: number;

  @IsBoolean()
  @ApiProperty({ description: '푸시 알람 활성화 여부', example: 'true', default: false })
  notification: boolean;
}