import { Injectable, UnauthorizedException } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { AuthInput } from './dto/auth.input';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService
  ) { }
  
  async register(createUserInput: AuthInput) {
    const user = await this.userService.findOne(createUserInput.email)
    if (user)
      return { success: false, message: 'User already exists' };

    const password = await bcrypt.hash(createUserInput.password, 10)

    const newUser = await this.userService.create({ ...createUserInput, password });

    return { success: true, message: 'User successfully created', data: newUser };
  }

  async login(authInput: AuthInput) {
    const user = await this.userService.findOne(authInput.email)
    if (!user)
      throw new UnauthorizedException('User not found');

    const hashedPassword = await bcrypt.hash(user.password, 10)
    const passwordMatch = await this.comparePasswords(user.password, hashedPassword)

    if (!passwordMatch) {
      return { success: false, message: 'Invalid credential' };
    }
    const { password, ...restData } = user

    const token = await this.jwtService.signAsync(restData)
      
    return { success: true, message: 'Login successful', data: { access_token: token, ...restData,  }};
  }

  async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword)
  }
}
