import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Link } from './entities/link.entity';
import { Equal, Repository } from 'typeorm';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Link)
    private readonly linkRepository: Repository<Link>,
  ) { }
  
  async shorten(url: string): Promise<Link> {
    const existingLink = await this.linkRepository.findOne({
      where: {
        original_url: url
      }
    });
    if (existingLink) return existingLink;

    const newLink = this.linkRepository.create({ original_url: url });
    return this.linkRepository.save(newLink);
  }

  async redirect(id: string): Promise<Link> {
    const existingLink = await this.linkRepository.findOne({
      where: {
        bee_id: id
      }
    });
    if (!existingLink) throw new NotFoundException('Link not found');

    return existingLink;
  }

  async findByUser(user_id: string): Promise<Link[]> {
    return this.linkRepository.find({
      where: {
        user: Equal(user_id)
      }
    });
  }
}
