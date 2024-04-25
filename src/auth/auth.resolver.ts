import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  GraphQLExecutionContext,
  GqlExecutionContext,
} from '@nestjs/graphql';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { AuthInput } from './dto/auth.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { User } from '../user/entities/user.entity';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation('register')
  async register(@Args('createUserInput') createUserInput: AuthInput) {
    return this.authService.register(createUserInput);
  }

  @Mutation('login')
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
    @Context() context: { req: Request; res: Response },
  ) {
    const response = await this.authService.login({ email, password });
    if (response.success) {
      context.res.cookie(
        'Authorization',
        'Bearer ' + response.data.access_token,
      );
    }
    return response;
  }

  @UseGuards(AuthGuard)
  @Query('me')
  getProfile(@Context() context: { req: { user: User } & Request }) {
    return {
      success: true,
      message: 'Profile fetched',
      data: context.req.user,
    };
  }
}
