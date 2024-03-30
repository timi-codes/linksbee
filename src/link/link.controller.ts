import { Controller, Get, Redirect, Param } from '@nestjs/common';
import { AppService } from '../app.service';
import { LinkService } from './link.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Controller()
export class LinkController {
  constructor(
    private readonly linkService: LinkService,
    @InjectQueue('analytics') private analyticsQueue: Queue
  ) { }

  @Get(":id")
  @Redirect()
  async redirect(@Param('id') id: string) {
    const { original_url } = await this.linkService.redirect(id);
    this.analyticsQueue.add('increment', { id });
    return { url:  original_url }
  }
}
