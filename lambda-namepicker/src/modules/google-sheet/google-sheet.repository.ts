import { GoogleSheetDataInvalidError } from '@damgle/errors';
import { Inject, Injectable } from '@nestjs/common';
import is from '@sindresorhus/is';
import { GoogleSheetApi, googleSheetApi } from './google-sheet.api';

export interface FetchSheetParameter {
  sheetId: string;
  sheetName: string;
  range: string;
}

@Injectable()
export class GoogleSheetRepository {
  constructor(@Inject(googleSheetApi.provide) private readonly api: GoogleSheetApi) {}

  async get<Content extends any[][]>(
    { range, sheetId, sheetName }: FetchSheetParameter,
    validate?: (data: any) => void
  ): Promise<Content> {
    const {
      data: { values },
    } = await this.api.spreadsheets.values.get({
      range: `${sheetName}!${range}`,
      spreadsheetId: sheetId,
    });

    if (!is.array(values)) {
      throw new GoogleSheetDataInvalidError({ domain: 'name-picker' });
    }

    if (validate) {
      validate(values);
    }

    return values as Content;
  }
}
