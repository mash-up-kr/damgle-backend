import { DuplicatedNickNameError, SignInFailureError, UserNotFoundError } from '@damgle/errors';
import { User, UserCounter, UserCounterDocument, UserDocument } from '@damgle/models';
import { staticEnv } from '@damgle/utils';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as jwt from 'jsonwebtoken';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { SignInPayload, SignUpPayload } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(UserCounter.name)
    private readonly userCounterModel: Model<UserCounterDocument>
  ) { }

  async signup({ nickname, notification }: SignUpPayload) {
    if (await this.userModel.findOne({ nickname })) {
      throw new DuplicatedNickNameError({ nickname });
    }
    const userNo = await this.atomicIncrement('userNo');
    const user = await this.userModel.create({
      userNo,
      nickname,
      notification,
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

  async me(userNo: number) {
    const user = await this.userModel.findOne({ userNo });
    if (!user) throw new UserNotFoundError({ userNo });
    return user;
  }

  async notify(userNo: number) {
    const user = await this.userModel.findOne({ userNo });
    if (user) {
      await this.userModel.updateOne(
        { userNo: userNo },
        { $set: { notification: !user.notification } },
        { upsert: true }
      ).exec();

      return await this.me(userNo);
    }
    throw new UserNotFoundError({ userNo });
  }

  async deleteMe(userNo: number): Promise<string> {
    const user = await this.userModel.findOne({ userNo });
    if (user) {
      await this.userModel.deleteOne({ userNo });
      return `Successfully deleted User ${userNo}`;
    }
    throw new UserNotFoundError({ userNo });
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
