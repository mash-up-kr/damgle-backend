import { AuthorizedRequest, JwtAuthGuard } from '@damgle/utils';
import { Body, Controller, Delete, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { Docs } from './auth.docs';
import { SignInPayload, SignInResult, SignUpPayload, SignUpResult, UserInfoResponse } from './auth.dto';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly auth: AuthService) { }

  @Post('/signup')
  @Docs.signUp('닉네임으로 유저를 생성합니다.')
  async signUp(@Body() signUpPayload: SignUpPayload): Promise<SignUpResult> {
    const [user, accessToken] = await this.auth.signup(signUpPayload);
    return {
      accessToken,
      userNo: user.userNo,
      nickname: user.nickname,
      notification: user.notification,
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
      notification: user.notification,
      refreshToken: user.refreshToken,
    };
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  @Docs.me('내 정보를 가져옵니다.')
  async me(@Req() req: AuthorizedRequest): Promise<UserInfoResponse> {
    const user = await this.auth.me(req.user.userNo);
    return {
      userNo: user.userNo,
      nickname: user.nickname,
      notification: user.notification,
    };
  }

  @Patch('/notify')
  @UseGuards(JwtAuthGuard)
  @Docs.notify('푸시 알람 설정을 변경합니다.')
  async notify(@Req() req: AuthorizedRequest): Promise<UserInfoResponse> {
    const updateUser = await this.auth.notify(req.user.userNo);
    return {
      userNo: updateUser.userNo,
      nickname: updateUser.nickname,
      notification: updateUser.notification,
    };
  }

  @Delete('/deleteme')
  @UseGuards(JwtAuthGuard)
  @Docs.deleteMe('서비스를 탈퇴합니다.')
  async deleteMe(@Req() req: AuthorizedRequest): Promise<{ message: string; }> {
    const msg = await this.auth.deleteMe(req.user.userNo);
    return { message: msg };
  }
}
