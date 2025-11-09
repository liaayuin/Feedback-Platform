import {
  IsString,
  IsOptional,
  MinLength,
  IsIn,
  IsNotEmpty,
} from 'class-validator';

export class CreateFeedbackDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsNotEmpty()
  @IsString()
  company: string;

  @IsString()
  @MinLength(5)
  message: string;

  @IsOptional()
  @IsString()
  @IsIn(['male', 'female', 'other'])
  gender?: string;
}

export class VoteFeedbackDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['up', 'down'])
  voteType: string;
}
