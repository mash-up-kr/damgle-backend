import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Environment } from '../../core/config';
import { GoogleSheetRepository } from './google-sheet.repository';

export type NickNameCandidates = { adjectives: string[]; nouns: string[] };

@Injectable()
export class GoogleSheetService {
  constructor(
    private readonly sheetRepository: GoogleSheetRepository,
    private readonly configService: ConfigService<Environment>
  ) {}

  // TODO: 너무 느리니 S3 캐싱해야할듯
  async getCandidates(): Promise<NickNameCandidates> {
    const sheetId = this.configService.getOrThrow<string>('google.sheetId', { infer: true });

    const rows = await this.sheetRepository.get<Array<[adjective: string, noun: string]>>({
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
}
