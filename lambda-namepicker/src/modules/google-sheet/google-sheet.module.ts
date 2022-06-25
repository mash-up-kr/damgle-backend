import { Module } from '@nestjs/common';
import { googleSheetApi } from './google-sheet.api';
import { GoogleSheetRepository } from './google-sheet.repository';
import { GoogleSheetService } from './google-sheet.service';

@Module({
  providers: [googleSheetApi, GoogleSheetService, GoogleSheetRepository],
  exports: [GoogleSheetService],
})
export class GoogleSheetModule {}
