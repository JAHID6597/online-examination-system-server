import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConfig } from 'src/config/jwt.config';
import { UserEntity } from './entity/user.entity';
import { JwtStrategy } from './user-auth/strategy/jwt.strategy';
import { UserAuthController } from './user-auth/user-auth.controller';
import { UserAuthService } from './user-auth/user-auth.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync(jwtConfig),
  ],
  controllers: [UserAuthController, UserController],
  providers: [UserService, UserAuthService, JwtStrategy],
  exports: [UserService, UserAuthService],
})
export class UserModule {}
