import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { Feedback } from './entities/feedback.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Feedback])], // Register Feedback entity for this module
  controllers: [FeedbackController],
  providers: [FeedbackService],
})
export class FeedbackModule {}
