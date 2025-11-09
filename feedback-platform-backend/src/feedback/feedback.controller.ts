import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto, VoteFeedbackDto } from './dto/create-feedback.dto';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post('submit')
  create(@Body() createFeedbackDto: CreateFeedbackDto) {
    const feedbackData = {
      ...createFeedbackDto,
      status: 'pending',
    } as any;

    return this.feedbackService.create(feedbackData);
  }

  @Get()
  findAllApproved() {
    return this.feedbackService.findAllApproved();
  }

  @Get('pending')
  findAllPending() {
    return this.feedbackService.findAllPending();
  }

  @Patch(':id/vote')
  handleVote(@Param('id') id: string, @Body() voteDto: VoteFeedbackDto) {
    return this.feedbackService.handleVote(id, voteDto);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: 'approved' | 'rejected',
  ) {
    return this.feedbackService.updateStatus(id, status);
  }
}
