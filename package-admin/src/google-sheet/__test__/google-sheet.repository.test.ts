import { createApi } from '../google-sheet.api';
import { GoogleSheet } from '..';
import { GoogleSheetRepository } from '../google-sheet.repository';

describe('google-sheet.repository', () => {
  it('e2e retrieve sheet', async () => {
    const { sheetId, ...apiConfig } = GoogleSheet.loadEnv();
    const repository = new GoogleSheetRepository(createApi(apiConfig));
    const result = await repository.get({
      sheetId,
      sheetName: 'Sheet1',
      range: 'A:B',
    });

    expect(result).toMatchInlineSnapshot(`
      Array [
        Array [
          "형용사",
          "명사",
        ],
        Array [
          "일하는",
          "고양이",
        ],
        Array [
          "술먹는",
          "강아지",
        ],
        Array [
          "잠자는",
          "비둘기",
        ],
      ]
    `);
  });
});
