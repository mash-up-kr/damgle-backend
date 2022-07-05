import { ConfigService } from '@nestjs/config';
import { sheets_v4 } from 'googleapis';
import { google } from 'googleapis';
import { Environment } from '../../core/config';

interface GoogleOAuthParams {
  client: {
    id: string;
    secret: string;
    redirectUrl: string; // 테스트 계정으로 생성한 토큰 정보만 가지고 사용할 것이기 때문에 필요없음
  };
  user: {
    access_token: string;
    refresh_token: string;
    scope: string;
    token_type: 'Bearer';
    expiry_date: number;
  };
}

export type GoogleSheetApi = sheets_v4.Sheets;

export const googleSheetApi = {
  provide: Symbol('GoogleSheetApi'),
  useFactory: (configService: ConfigService<Environment>) => {
    return new sheets_v4.Sheets({
      auth: createAuth(
        {
          id: configService.getOrThrow<string>('google.oauth.clientId', { infer: true }),
          secret: configService.getOrThrow<string>('google.oauth.google.oauth.clientSecret', { infer: true }),
          redirectUrl: '',
        },
        {
          access_token: '',
          refresh_token: configService.getOrThrow<string>('google.oauth.refreshToken', { infer: true }),
          scope: 'https://www.googleapis.com/auth/drive',
          token_type: 'Bearer',
          expiry_date: -1,
        }
      ),
    });
  },
  inject: [ConfigService],
};

function createAuth(client: GoogleOAuthParams['client'], user: GoogleOAuthParams['user']) {
  const oAuth2Client = new google.auth.OAuth2(client.id, client.secret, client.redirectUrl);
  oAuth2Client.setCredentials(user);
  return oAuth2Client;
}
