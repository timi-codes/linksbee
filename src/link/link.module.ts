import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkService } from './link.service';
import { LinkResolver } from './link.resolver';
import { Link } from './entities/link.entity';
import { LinkController } from './link.controller';
import { BullModule } from '@nestjs/bull';
import { AnalyticsConsumer } from './analytics/analytics.processor';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Analytics, AnalyticsSchema } from './analytics/analytics.schema';

@Module({
  controllers: [LinkController],
  imports: [
    TypeOrmModule.forFeature([Link]),
    BullModule.registerQueue({
      name: 'analytics',
    }),
    HttpModule,
    MongooseModule.forFeature([{ name: Analytics.name, schema: AnalyticsSchema }])
  ],
  providers: [LinkController, LinkResolver, LinkService, AnalyticsConsumer],
})
export class LinkModule {}
