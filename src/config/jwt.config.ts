import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: () => ({
    secret: process.env.SECRET_KEY,
    signOptions: { expiresIn: process.env.SECRET_KEY_EXPIRES },
  }),
};
