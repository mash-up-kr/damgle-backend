import { sheets_v4 } from 'googleapis';
import { google } from 'googleapis';

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

export type GoogleSheetApiConfig = {
  id: string;
  secret: string;
  refreshToken: string;
};

export function createApi({ id, secret, refreshToken }: GoogleSheetApiConfig): GoogleSheetApi {
  return new sheets_v4.Sheets({
    auth: createAuth(
      {
        id,
        secret,
        redirectUrl: '',
      },
      {
        access_token: '',
        refresh_token: refreshToken,
        scope: 'https://www.googleapis.com/auth/drive',
        token_type: 'Bearer',
        expiry_date: -1,
      }
    ),
  });
}

function createAuth(client: GoogleOAuthParams['client'], user: GoogleOAuthParams['user']) {
  const oAuth2Client = new google.auth.OAuth2(client.id, client.secret, client.redirectUrl);
  oAuth2Client.setCredentials(user);
  return oAuth2Client;
}
