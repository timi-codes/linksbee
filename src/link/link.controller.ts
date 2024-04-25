import { Controller, Get, Redirect, Param, Req } from '@nestjs/common';
import { LinkService } from './link.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Request } from 'express';

@Controller()
export class LinkController {
  constructor(
    private readonly linkService: LinkService,
    @InjectQueue('analytics') private analyticsQueue: Queue,
  ) {}

  @Get(':id([a-zA-Z]{7})')
  @Redirect()
  async redirect(@Param('id') id: string, @Req() request: Request) {
    const { original_url } = await this.linkService.redirect(id);
    await this.analyticsQueue.add({
      id,
      agent: request.headers['user-agent'],
      referrer: request.headers['referrer'],
      ip: request.ip,
      date: new Date(),
    });
    return { url: original_url };
  }
}
