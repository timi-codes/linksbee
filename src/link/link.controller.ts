import { Controller, Get, Redirect, Param } from '@nestjs/common';
import { AppService } from '../app.service';
import { LinkService } from './link.service';

@Controller()
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Get(":id")
  @Redirect()
  async redirect(@Param('id') id: string) {
    const { original_url } = await this.linkService.redirect(id);
    return { url:  original_url }
  }
}
