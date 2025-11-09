import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { FeedbackModule } from './feedback/feedback.module';
import { Feedback } from './feedback/entities/feedback.entity'; // Import entity

@Module({
  imports: [
    // Load .env file for configuration (e.g., DB credentials)
    ConfigModule.forRoot({ isGlobal: true }),

    // TypeORM/PostgreSQL Setup
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT!, 10) || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'yourpassword',
      database: process.env.DB_NAME || 'guday_feedback_db',

      entities: [Feedback],

      synchronize: false,
    }),

    FeedbackModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
