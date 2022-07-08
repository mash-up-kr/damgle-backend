import { GoogleSheetRepository } from './google-sheet.repository';
import { createApi, GoogleSheetApiConfig } from './google-sheet.api';
import { staticEnv } from '@damgle/utils';

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
    return {
      sheetId: staticEnv.namepicker_sheet_id,
      id: staticEnv.gcp_oauth_client_id,
      secret: staticEnv.gcp_oauth_client_secret,
      refreshToken: staticEnv.gcp_oauth_refresh_token,
    };
  }
}
