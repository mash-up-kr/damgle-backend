import { Report, ReportSchema } from '@damgle/models';
import { JwtStrategy } from '@damgle/utils';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StoryModule } from '../story/story.module';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Report.name, schema: ReportSchema }]), StoryModule],
  providers: [ReportService, JwtStrategy],
  controllers: [ReportController],
})
export class ReportModule {}
