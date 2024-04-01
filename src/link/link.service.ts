import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Link } from './entities/link.entity';
import { Equal, Repository } from 'typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { Analytics } from './analytics/analytics.schema';
import { Model } from 'mongoose';
import { groupData } from 'src/utils';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Link)
    private readonly linkRepository: Repository<Link>,
    @InjectModel(Analytics.name) private analyticsModel: Model<Analytics>
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

  async analytics(id: string): Promise<any> { 
    const docs = await this.analyticsModel.find({
      bee_id: id
    }).lean().exec();

    const dates = groupData(docs, "date", (data, key: string) => data[key].toISOString().split('T')[0]);
    const browsers = groupData(docs, "browser");
    const os = groupData(docs, "os");
    const countries = groupData(docs, "country",  (data, key: string) => data[key].name);

    return { dates, browsers, os, countries}
  }

  async findOne(id: string): Promise<Link> {
    return this.linkRepository.findOne({
      where: {
        bee_id: id
      }
    });
  }
}
