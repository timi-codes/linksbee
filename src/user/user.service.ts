import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(user: CreateUserDto) {
    const newUser = this.userRepository.create({ ...user });
    return this.userRepository.save(newUser);
  }

  findOne(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }
}
