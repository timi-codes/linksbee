import { Controller, Get, Redirect, Param, Req } from '@nestjs/common';
import { LinkService } from './link.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Request } from 'express';

@Controller()
export class LinkController {
  constructor(
    private readonly linkService: LinkService,
    @InjectQueue('analytics') private analyticsQueue: Queue
  ) { }

  @Get(":id")
  @Redirect()
  async redirect(@Param('id') id: string, @Req() request: Request) {
    const { original_url } = await this.linkService.redirect(id);
    await this.analyticsQueue.add({
      id,
      browser: {
        agent: request.headers['user-agent'],
        referrer: request.headers['referrer'],
        ip: request.ip,
        date: request.headers['Date'],
      }
    });
    return { url:  original_url }
  }
}
