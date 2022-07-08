import { S3_NAMEPICKER_CANDIDATE_PATH } from '@damgle/utils';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import got from 'got';

@Injectable()
export class NamePickerService {
  constructor(private readonly configService: ConfigService) {}

  async getHello(): Promise<any> {
    return got(this.configService.getOrThrow('cdnHost') + '/' + S3_NAMEPICKER_CANDIDATE_PATH).json();
  }
}
