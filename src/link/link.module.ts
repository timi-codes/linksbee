import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkService } from './link.service';
import { LinkResolver } from './link.resolver';
import { Link } from './entities/link.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Link])],
  providers: [LinkResolver, LinkService],
})
export class LinkModule {}
