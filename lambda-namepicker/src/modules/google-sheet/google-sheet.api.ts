import { ConfigService } from '@nestjs/config';
import { sheets_v4 } from 'googleapis';

export type GoogleSheetApi = sheets_v4.Sheets;

export const googleSheetApi = {
  provide: Symbol('GoogleSheetApi'),
  useFactory: (configService: ConfigService) => {
    const key = configService.getOrThrow<string>('google.apiKey', { infer: true });
    return new sheets_v4.Sheets({ auth: key });
  },
  inject: [ConfigService],
};
