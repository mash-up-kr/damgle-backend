import { DuplicatedNickNameError, SignInFailureError } from '@damgle/errors';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignInPayload, SignUpPayload } from './auth.dto';
import { staticEnv } from '@damgle/utils';
import { v4 as uuidv4 } from 'uuid';
import * as jwt from 'jsonwebtoken';
import { User, UserCounter, UserCounterDocument, UserDocument } from '@damgle/models';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(UserCounter.name)
    private readonly userCounterModel: Model<UserCounterDocument>
  ) {}

  async signup({ nickname }: SignUpPayload) {
    if (await this.userModel.findOne({ nickname })) {
      throw new DuplicatedNickNameError({ nickname });
    }
    const userNo = await this.atomicIncrement('userNo');
    const user = await this.userModel.create({
      userNo,
      nickname,
      refreshToken: '',
    });

    await user.save();

    const { accessToken, refreshToken } = this.issueToken(user);
    user.refreshToken = refreshToken;
    await user.save();

    return [user, accessToken] as const;
  }

  async signin({ refreshToken, userNo }: SignInPayload) {
    const user = await this.userModel.findOne({ userNo, refreshToken });
    if (user) {
      const { accessToken, refreshToken } = this.issueToken(user);
      user.refreshToken = refreshToken;
      await user.save();

      return [user, accessToken] as const;
    }
    throw new SignInFailureError({ reason: 'userNo와 refreshToken 정보가 존재하지 않습니다.' });
  }

  private issueToken(user: User): { accessToken: string; refreshToken: string } {
    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken();
    return {
      accessToken,
      refreshToken,
    };
  }

  private generateAccessToken(user: User) {
    const secret = staticEnv.jwt_secret;
    const accessToken = jwt.sign({ userNo: user.userNo, nickname: user.nickname }, secret);
    return accessToken;
  }

  private generateRefreshToken() {
    return uuidv4();
  }

  private async atomicIncrement(key: string) {
    let result: { count: number } | null = null;
    while (result == null) {
      result = await this.userCounterModel.findOneAndUpdate(
        { key },
        { $inc: { count: 1 } },
        { upsert: true, returnOriginal: false }
      );
    }
    return result!.count;
  }
}
