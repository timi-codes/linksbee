import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Link } from './entities/link.entity';
import { Equal, Repository } from 'typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { Analytics } from './analytics/analytics.schema';
import { Model } from 'mongoose';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Link)
    private readonly linkRepository: Repository<Link>,
    @InjectModel(Analytics.name) private analyticsModel: Model<Analytics>,
  ) {}

  async shorten(url: string): Promise<Link> {
    const existingLink = await this.linkRepository.findOne({
      where: {
        original_url: url,
      },
    });
    if (existingLink) return existingLink;

    const newLink = this.linkRepository.create({ original_url: url });
    return this.linkRepository.save(newLink);
  }

  async redirect(id: string): Promise<Link> {
    const existingLink = await this.linkRepository.findOne({
      where: {
        bee_id: id,
      },
    });
    if (!existingLink) throw new NotFoundException('Link not found');

    return existingLink;
  }

  async findByUser(user_id: string): Promise<Link[]> {
    return this.linkRepository.find({
      where: {
        user: Equal(user_id),
      },
    });
  }

  async analytics(id: string): Promise<any> {
    const docs = await this.analyticsModel.aggregate([
      {
        $match: {
          bee_id: id,
        },
      },
      {
        $facet: {
          browser: [
            {
              $group: {
                _id: '$browser',
                count: { $sum: 1 },
              },
            },
            {
              $project: {
                label: '$_id',
                value: '$count',
                _id: 0,
              },
            },
          ],
          os: [
            {
              $group: {
                _id: '$os',
                count: { $sum: 1 },
              },
            },
            {
              $project: {
                label: '$_id',
                value: '$count',
              },
            },
          ],
          country: [
            {
              $group: {
                _id: '$country.name',
                count: { $sum: 1 },
              },
            },
            {
              $project: {
                label: '$_id',
                value: '$count',
              },
            },
          ],
          date: [
            {
              $group: {
                _id: {
                  $dateTrunc: {
                    date: '$date',
                    unit: 'hour',
                    binSize: 24,
                  },
                },
                count: { $sum: 1 },
              },
            },
            {
              $project: {
                label: '$_id',
                value: '$count',
                _id: 0,
              },
            },
          ],
          total_clicks: [
            {
              $count: 'clicks',
            },
          ],
        },
      },
      {
        $project: {
          browser: 1,
          country: 1,
          os: 1,
          date: 1,
          total_clicks: { $arrayElemAt: ['$total_clicks.clicks', 0] },
        },
      },
    ]);
    return { ...docs[0] };
  }

  async findOne(id: string): Promise<Link> {
    return this.linkRepository.findOne({
      where: {
        bee_id: id,
      },
    });
  }

  async updateOne(id: string, data: Partial<Link>): Promise<number> {
    return (await this.linkRepository.update(id, { ...data })).affected;
  }
}
