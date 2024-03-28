import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { LinkService } from './link.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { User } from 'src/user/entities/user.entity';

@Resolver('Link')
export class LinkResolver {
  constructor(private readonly linkService: LinkService) {}

  @Mutation('shorten')
  create(@Args('url') url: string) {
    return this.linkService.shorten(url);
  }

  @UseGuards(AuthGuard)
  @Query('links')
  getUserLinks(@Context() context: { req: { user: User } & Request }) {
    return this.linkService.findByUser(context.req.user.id);
  }

  // @Query('link')
  // findOne(@Args('id') id: number) {
  //   return this.linkService.findOne(id);
  // }

  // @Mutation('updateLink')
  // update(@Args('updateLinkInput') updateLinkInput: UpdateLinkInput) {
  //   return this.linkService.update(updateLinkInput.id, updateLinkInput);
  // }

  // @Mutation('removeLink')
  // remove(@Args('id') id: number) {
  //   return this.linkService.remove(id);
  // }
}
