import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkService } from './link.service';
import { LinkResolver } from './link.resolver';
import { Link } from './entities/link.entity';
import { LinkController } from './link.controller';
import { BullModule } from '@nestjs/bull';

@Module({
  controllers: [LinkController],
  imports: [
    TypeOrmModule.forFeature([Link]),
    BullModule.registerQueue({
      name: 'analytics',
    })
  ],
  providers: [LinkController, LinkResolver, LinkService],
})
export class LinkModule {}
