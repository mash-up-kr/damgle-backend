import { GoogleSheetRepository } from './google-sheet.repository';
import { createApi, GoogleSheetApiConfig } from './google-sheet.api';
import { ensuredEnv } from '@damgle/utils';

export namespace GoogleSheet {
  export type NickNameCandidates = { adjectives: string[]; nouns: string[] };

  export async function fetchCandidates({
    sheetId,
    ...apiConfig
  }: GoogleSheetApiConfig & { sheetId: string }): Promise<NickNameCandidates> {
    const repository = new GoogleSheetRepository(createApi(apiConfig));
    const rows = await repository.get<Array<[adjective: string, noun: string]>>({
      range: 'A:B',
      sheetName: 'Sheet1',
      sheetId,
    });

    const adjectives = [];
    const nouns = [];

    for (const [adjective, noun] of rows.slice(1)) {
      adjectives.push(adjective);
      nouns.push(noun);
    }

    return { adjectives, nouns };
  }

  export function loadEnv() {
    return ensuredEnv({
      sheetId: 'NAMEPICKER_SHEET_ID',
      id: 'GCP_OAUTH_CLIENT_ID',
      secret: 'GCP_OAUTH_CLIENT_SECRET',
      refreshToken: 'GCP_OAUTH_REFRESH_TOKEN',
    });
  }
}
