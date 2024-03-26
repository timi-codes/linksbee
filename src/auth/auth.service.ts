import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { AuthInput } from './dto/auth.input';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private configService: ConfigService
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
      return { success: false, message: 'User not found' };

    const hashedPassword = await bcrypt.hash(user.password, 10)
    const passwordMatch = await this.comparePasswords(user.password, hashedPassword)

    if (!passwordMatch) {
      return { success: false, message: 'Invalid credential' };
    }
    const { password, ...restData } = user

    const jwtConfig = this.configService.get<jwt.SignOptions & { secret: string }>('jwt');
    const token = jwt.sign(restData, jwtConfig.secret, { ...jwtConfig });

    return { success: true, message: 'Login successful', data: { auth: token, ...restData,  }};
  }

  async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword)
  }
}
