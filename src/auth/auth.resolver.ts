import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { AuthInput } from './dto/auth.input';
import { Req } from '@nestjs/common';

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @Mutation('register')
  async register(@Args('createUserInput') createUserInput: AuthInput) {
    return this.authService.register(createUserInput)
  }

  @Mutation('login')
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
    @Context('res') res: Response,
  ) {
    const response = await this.authService.login({ email, password })
    if (response.success) {
      res.cookie("authorization", "Bearer " + response.data.auth);
    }
    return response
  }

  @Query('me')
  findAll(@Context() context) {
    return {}
  }
}
