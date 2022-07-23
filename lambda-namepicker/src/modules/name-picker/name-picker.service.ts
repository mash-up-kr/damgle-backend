import { BadRequestError } from '@damgle/errors';
import { constant, staticEnv } from '@damgle/utils';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import got from 'got';
import { Model } from 'mongoose';
import pickRandom from 'pick-random';
import { Cacheable } from '../../core/cache';
import { CandidateCounter, CandidateCounterDocument } from './candidate-counter.schema';

@Injectable()
export class NamePickerService {
  constructor(
    @InjectModel(CandidateCounter.name)
    private readonly candidateCounterModel: Model<CandidateCounterDocument>
  ) {}

  async getName({ adjective, noun }: { adjective?: string; noun?: string }): Promise<any> {
    const { adjectives, nouns } = await this.getCandidateData();

    adjective ??= pickRandom(adjectives, { count: 1 })[0];
    noun ??= pickRandom(nouns, { count: 1 })[0];

    const key = this.createKey(adjective, noun);
    const record = await this.candidateCounterModel.findOne({ key });
    const nth = record == null ? 1 : record.count + 1;

    return {
      name: this.createFullName(adjective, noun, nth),
      adjective,
      noun,
      nth,
    };
  }

  async pickName(adjective: string, noun: string) {
    const { adjectives, nouns } = await this.getCandidateData();
    if (!adjectives.includes(adjective)) {
      throw new BadRequestError({ reason: `${adjective}는 선택할 수 없습니다.` });
    }
    if (!nouns.includes(noun)) {
      throw new BadRequestError({ reason: `${noun}는 선택할 수 없습니다.` });
    }
    const nth = await this.atomicIncrement(this.createKey(adjective, noun));

    return {
      name: this.createFullName(adjective, noun, nth),
      adjective,
      noun,
      nth,
    };
  }

  private createKey(adjective: string, noun: string): string {
    return `${adjective}_${noun}`;
  }

  private createFullName(adjective: string, noun: string, nth: number): string {
    return `${adjective} ${this.maybeKorean(nth)}번째 ${noun}`;
  }

  @Cacheable(180)
  private async getCandidateData(): Promise<{ adjectives: string[]; nouns: string[] }> {
    return await got(staticEnv.cdn_host + '/' + constant.s3_namepicker_candidate_path).json();
  }

  private maybeKorean(nth: number): string {
    return (
      ['', '첫', '두', '세', '네', '다섯', '여섯', '일곱', '여덟', '아홉', '열'][nth] ??
      nth.toString
    );
  }

  private async atomicIncrement(key: string) {
    let result: { count: number } | null = null;
    while (result == null) {
      result = await this.candidateCounterModel.findOneAndUpdate(
        { key },
        { $inc: { count: 1 } },
        { upsert: true, returnOriginal: false }
      );
    }
    return result!.count;
  }
}
