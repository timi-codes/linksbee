import { Injectable, NotFoundException } from '@nestjs/common';
import { Link } from './link/entities/link.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Link)
    private readonly linkRepository: Repository<Link>,
  ) { }
  
  async redirect(id: string): Promise<Link> {
    const existingLink = await this.linkRepository.findOne({
      where: {
        bee_id: id
      }
    });
    if (!existingLink) throw new NotFoundException('Link not found');

    return existingLink;
  }
}
