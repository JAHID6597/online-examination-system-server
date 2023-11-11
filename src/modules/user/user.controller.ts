import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ApiGuard } from 'src/common/decorators/api.guard.decorator';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { SwaggerResponseType } from './../../common/type/swagger-response.type';
import { UserResponseDTO } from './dto/user-response.dto';
import { UserEntity } from './entity/user.entity';
import { UserPayload } from './user-auth/dto/user-payload.dto';
import { UserService } from './user.service';

@ApiTags('User')
@ApiGuard()
@Controller('user')
@ApiSecurity('JWT-AUTH')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({ type: SwaggerResponseType(UserResponseDTO) })
  @HttpCode(HttpStatus.OK)
  @Get('profile')
  public async getProfile(
    @CurrentUser() user: UserPayload,
  ): Promise<UserEntity> {
    return await this.userService.findProfile(user.user_id);
  }
}
