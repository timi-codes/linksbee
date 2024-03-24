import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateLinkInput } from './dto/update-link.input';
import { Link } from './entities/link.entity';
import { Repository } from 'typeorm';

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

  findAll() {
    return `This action returns all link`;
  }

  findOne(id: number) {
    return `This action returns a #${id} link`;
  }

  update(id: number, updateLinkInput: UpdateLinkInput) {
    return `This action updates a #${id} link`;
  }

  remove(id: number) {
    return `This action removes a #${id} link`;
  }
}
