import { Controller, Get } from '@nestjs/common';
import { Docs } from './marker.docs';
import { MarkerService } from './marker.service';

@Controller()
export class MarkerController {
  constructor(private readonly marker: MarkerService) {}

  @Get()
  async findMarkers() {}
}
