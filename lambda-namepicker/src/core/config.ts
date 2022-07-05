import { ensuredEnv } from '@damgle/utils';
import { ConfigModule } from '@nestjs/config';

export interface Environment {
  'google.sheetId': string;
  'google.oauth.clientId': string;
  'google.oauth.clientSecret': string;
  'google.oauth.refreshToken': string;
}

const config = async (): Promise<Environment> => {
  return ensuredEnv({
    'google.sheetId': 'NAMEPICKER_SHEET_ID',
    'google.oauth.clientId': 'GCP_OAUTH_CLIENT_ID',
    'google.oauth.clientSecret': 'GCP_OAUTH_CLIENT_SECRET',
    'google.oauth.refreshToken': 'GCP_OAUTH_REFRESH_TOKEN',
  });
};

export const configModule = ConfigModule.forRoot({
  isGlobal: true,
  load: [config],
});
