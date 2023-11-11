import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { UserRegistrationDTO } from './user-auth/dto/user-registration.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public findOneBy(key: string, value: any) {
    return this.userRepository.findOneBy({ [key]: value });
  }

  public async findProfile(id: string): Promise<UserEntity> {
    const profile = await this.findOneBy('id', id);
    if (!profile) {
      throw new NotFoundException('No such user profile exists.');
    }

    return profile;
  }

  public findUsers() {
    return this.userRepository.find();
  }

  private generateHashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  public async registration(userDto: UserRegistrationDTO) {
    await this.canRegistration(userDto.username, userDto.email);

    const user = this.userRepository.create(userDto);
    user.password = await this.generateHashPassword(userDto.password);

    return await this.userRepository.save(user);
  }

  private async canRegistration(username: string, email: string) {
    const getMsg = (type: string) =>
      `Already a user registered with this ${type}. plz! try again later with another ${type}.`;

    const userByUserName = await this.findOneBy('username', username);
    if (userByUserName) {
      throw new NotFoundException(getMsg('username'));
    }

    const userByEmail = await this.findOneBy('email', email);
    if (userByEmail) {
      throw new NotFoundException(getMsg('email'));
    }

    return true;
  }
}
