import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Docs } from './auth.docs';
import { SignInPayload, SignInResult, SignUpPayload, SignUpResult } from './auth.dto';
import { AuthService } from './auth.service';
import { AuthorizedRequest } from './auth.type';
import { JwtAuthGuard } from './jwt/jwt.guard';

@Controller()
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('/signup')
  @Docs.signUp('닉네임으로 유저를 생성합니다.')
  async signUp(@Body() signUpPayload: SignUpPayload): Promise<SignUpResult> {
    const [user, accessToken] = await this.auth.signup(signUpPayload);
    return {
      accessToken,
      userNo: user.userNo,
      nickname: user.nickname,
      refreshToken: user.refreshToken,
    };
  }

  @Post('/signin')
  @Docs.signIn('refreshToken과 userNo를 사용해서 새로운 액세스 토큰을 발급합니다.')
  async signIn(@Body() signInPayload: SignInPayload): Promise<SignInResult> {
    const [user, accessToken] = await this.auth.signin(signInPayload);
    return {
      accessToken,
      userNo: user.userNo,
      nickname: user.nickname,
      refreshToken: user.refreshToken,
    };
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  @Docs.me('내 정보를 가져옵니다.')
  async me(@Req() req: AuthorizedRequest): Promise<{ userNo: number; nickname: string }> {
    return {
      userNo: req.user.userNo,
      nickname: req.user.nickname,
    };
  }
}
