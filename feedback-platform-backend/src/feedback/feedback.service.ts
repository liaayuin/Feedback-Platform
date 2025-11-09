import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from './entities/feedback.entity';
import { CreateFeedbackDto, VoteFeedbackDto } from './dto/create-feedback.dto';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,
  ) {}

  async create(createFeedbackDto: CreateFeedbackDto): Promise<Feedback> {
    const feedback = this.feedbackRepository.create(createFeedbackDto);
    return this.feedbackRepository.save(feedback);
  }

  async findAllApproved(): Promise<Feedback[]> {
    return this.feedbackRepository.find({
      where: { status: 'approved' },
      order: { createdAt: 'DESC' },
    });
  }

  async findAllPending(): Promise<Feedback[]> {
    return this.feedbackRepository.find({
      where: { status: 'pending' },
      order: { createdAt: 'ASC' },
    });
  }

  async handleVote(id: string, voteDto: VoteFeedbackDto): Promise<Feedback> {
    const feedback = await this.feedbackRepository.findOneBy({ id });
    if (!feedback) {
      throw new NotFoundException(`Feedback with ID ${id} not found`);
    }

    const { userId, voteType } = voteDto;
    const voterKey = `${userId}-${voteType}`;

    const alreadyVoted = feedback.voters.some(
      (v) => v === userId || v.startsWith(`${userId}-`),
    );
    if (alreadyVoted) {
      return feedback;
    }

    if (voteType === 'up') {
      feedback.upvotes += 1;
    } else {
      feedback.downvotes += 1;
    }
    feedback.voters.push(userId, voterKey);

    return this.feedbackRepository.save(feedback);
  }

  async updateStatus(
    id: string,
    newStatus: 'approved' | 'rejected',
  ): Promise<Feedback> {
    const result = await this.feedbackRepository.update(id, {
      status: newStatus,
    });

    if (result.affected === 0) {
      throw new NotFoundException(`Feedback with ID ${id} not found`);
    }

    const updatedFeedback = await this.feedbackRepository.findOneBy({ id });

    if (!updatedFeedback) {
      throw new NotFoundException(
        `Feedback with ID ${id} not found after update`,
      );
    }

    return updatedFeedback;
  }
}
