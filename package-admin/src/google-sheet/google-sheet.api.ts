import { sheets_v4 } from 'googleapis';
import { createAuth } from './google-sheet.auth';

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
