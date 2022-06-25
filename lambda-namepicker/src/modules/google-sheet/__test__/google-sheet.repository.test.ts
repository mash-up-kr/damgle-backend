import { Test } from '@nestjs/testing';
import { configModule } from '../../../core/config';
import { googleSheetApi } from '../google-sheet.api';
import { GoogleSheetRepository } from '../google-sheet.repository';

describe('google-sheet.repository', () => {
  it.skip('e2e retrieve sheet', async () => {
    const key = '';
    const sheetId = '';

    process.env.GCP_API_KEY = key;
    process.env.NAMEPICKER_SHEET_ID = sheetId;

    const moduleRef = await Test.createTestingModule({
      imports: [configModule],
      providers: [GoogleSheetRepository, googleSheetApi],
    }).compile();

    const repository = moduleRef.get<GoogleSheetRepository>(GoogleSheetRepository);
    const result = await repository.get({
      sheetId,
      sheetName: 'Sheet1',
      range: 'A:B',
    });

    expect(result).toMatchInlineSnapshot(`
      Object {
        "majorDimension": "ROWS",
        "range": "Sheet1!A1:B1000",
        "values": Array [
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
        ],
      }
    `);
  });
});
