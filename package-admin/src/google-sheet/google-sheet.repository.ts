import { GoogleSheetDataInvalidError } from '@damgle/errors';
import is from '@sindresorhus/is';
import { GoogleSheetApi } from './google-sheet.api';

export interface FetchSheetParameter {
  sheetId: string;
  sheetName: string;
  range: string;
}

export class GoogleSheetRepository {
  constructor(private readonly api: GoogleSheetApi) {}

  async get<Content extends any[][]>(
    { range, sheetId, sheetName }: FetchSheetParameter,
    validate?: (data: any) => void
  ): Promise<Content> {
    const result = await this.api.spreadsheets.values.get({
      range: `${sheetName}!${range}`,
      spreadsheetId: sheetId,
    });
    const {
      data: { values },
    } = result;

    if (!is.array(values)) {
      throw new GoogleSheetDataInvalidError({ domain: 'name-picker' });
    }

    if (validate) {
      validate(values);
    }

    return values as Content;
  }
}
