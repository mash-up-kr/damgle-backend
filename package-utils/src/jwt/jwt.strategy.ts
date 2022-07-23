import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { staticEnv } from '@damgle/utils';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: staticEnv.jwt_secret,
    });
  }

  validate(payload: { userNo: string; nickname: string }) {
    return { userNo: payload.userNo, nickname: payload.nickname };
  }
}
