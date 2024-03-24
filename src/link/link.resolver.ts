import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LinkService } from './link.service';
import { CreateLinkInput } from './dto/create-link.input';
import { UpdateLinkInput } from './dto/update-link.input';

@Resolver('Link')
export class LinkResolver {
  constructor(private readonly linkService: LinkService) {}

  @Mutation('shorten')
  create(@Args('url') url: string) {
    return this.linkService.shorten(url);
  }

  // @Query('link')
  // findAll() {
  //   return this.linkService.findAll();
  // }

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
