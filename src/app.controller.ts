import { Controller, Get, Redirect, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(":id")
  @Redirect()
  async redirect(@Param('id') id: string) {

    const { original_url } = await this.appService.redirect(id);
    return { url:  original_url }
  }
}
