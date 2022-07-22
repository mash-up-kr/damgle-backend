import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Docs } from './name-picker.docs';
import { NameResult, PickNamePayload } from './name-picker.dto';
import { NamePickerService } from './name-picker.service';

@Controller()
export class NamePickerController {
  constructor(private readonly namePicker: NamePickerService) {}

  @Get()
  @Docs.getName('닉네임을 랜덤으로 조회합니다.')
  async getName(
    @Query('adjective') adjective?: string,
    @Query('noun') noun?: string
  ): Promise<NameResult> {
    return await this.namePicker.getName({ adjective, noun });
  }

  @Post()
  @Docs.pickName('닉네임을 선택합니다.')
  async pickName(@Body() payload: PickNamePayload): Promise<NameResult> {
    return await this.namePicker.pickName(payload.adjective, payload.noun);
  }
}
