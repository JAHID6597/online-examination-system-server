import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user.service';
import { UserLoginResponseDTO } from './dto/user-login-response.dto';
import { UserLoginDTO } from './dto/user-login.dto';

@Injectable()
export class UserAuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtTokenService: JwtService,
  ) {}

  public async validateUser(loginDTO: UserLoginDTO) {
    const user = await this.userService.findOneBy(
      'username',
      loginDTO.username,
    );
    if (!user) {
      throw new BadRequestException('Invalid credentials.');
    }
    const isValidPassword = await bcrypt.compare(
      loginDTO.password,
      user.password,
    );

    return user && isValidPassword ? user : null;
  }

  public async login(user: UserLoginDTO) {
    const validUser = await this.validateUser({
      username: user.username,
      password: user.password,
    });
    if (!validUser) {
      throw new BadRequestException('Invalid credentials.');
    }
    if (!validUser.is_active) {
      throw new BadRequestException('User is in-active.');
    }

    const payload = {
      user_id: validUser.id,
      username: validUser.username,
      role: validUser.role,
      sub: validUser.id,
    };
    const accessToken = this.jwtTokenService.sign(payload);

    return new UserLoginResponseDTO(accessToken, validUser);
  }
}
