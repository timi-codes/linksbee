import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { LinkService } from 'src/link/link.service';


@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(private readonly linkService: LinkService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlCtx = GqlExecutionContext.create(context);
    const request = gqlCtx.getContext().req;
        
    try {
        const user = request['user'];
        const id = request.params['id']

        const link = await this.linkService.findOne(id);
        if (link.user !== user.id) throw new UnauthorizedException();
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}