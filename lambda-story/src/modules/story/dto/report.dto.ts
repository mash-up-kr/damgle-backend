import { ApiProperty } from '@nestjs/swagger';

export class ReportResponseDto {
  @ApiProperty()
  userNo: number;

  @ApiProperty()
  createdAt: number;
}
