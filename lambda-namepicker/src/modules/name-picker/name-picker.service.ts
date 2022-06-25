import { Injectable } from '@nestjs/common';
import { GoogleSheetService } from '../google-sheet/google-sheet.service';

@Injectable()
export class NamePickerService {
  constructor(private readonly googleSheet: GoogleSheetService) {}

  async getHello(): Promise<any> {
    // TODO impl
    const data = await this.googleSheet.getCandidates();
    return data;
  }
}
