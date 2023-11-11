import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '../user.service';
import { SwaggerResponseType } from './../../../common/type/swagger-response.type';
import { UserLoginResponseDTO } from './dto/user-login-response.dto';
import { UserLoginDTO } from './dto/user-login.dto';
import { UserRegistrationDTO } from './dto/user-registration.dto';
import { UserAuthService } from './user-auth.service';

@ApiTags('User Account')
@Controller('user/account')
export class UserAuthController {
  constructor(
    private readonly userService: UserService,
    private readonly userAuthService: UserAuthService,
  ) {}

  @ApiOkResponse({ type: SwaggerResponseType(UserLoginResponseDTO) })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  public async login(@Body() body: UserLoginDTO) {
    return await this.userAuthService.login(body);
  }

  @ApiOkResponse({ type: SwaggerResponseType(UserRegistrationDTO) })
  @HttpCode(HttpStatus.CREATED)
  @Post('registration')
  public async registration(@Body() userDto: UserRegistrationDTO) {
    return await this.userService.registration(userDto);
  }
}
