import {
  BadRequestException,
  Inject,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../user.service';

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    configService: ConfigService,
  ) {
    super(JwtStrategy.getJwtOptions(configService));
  }

  async validate(payload: any) {
    const user = await this.userService.findOneBy('username', payload.username);
    if (!user) {
      throw new UnauthorizedException();
    }
    if (!user.is_active) {
      throw new BadRequestException('User is in-active.');
    }

    return {
      user_id: payload.user_id,
      username: payload.username,
      role: payload.role,
    };
  }

  private static getJwtOptions(configService: ConfigService) {
    return {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('SECRET_KEY'),
    };
  }
}
