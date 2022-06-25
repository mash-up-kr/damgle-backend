import { ensuredEnv } from '@damgle/utils';
import { ConfigModule } from '@nestjs/config';

export interface Environment {
  'google.apiKey': string;
  'google.sheetId': string;
}

const config = async (): Promise<Environment> => {
  return ensuredEnv({
    'google.apiKey': 'GCP_API_KEY',
    'google.sheetId': 'NAMEPICKER_SHEET_ID',
  });
};

export const configModule = ConfigModule.forRoot({
  isGlobal: true,
  load: [config],
});
