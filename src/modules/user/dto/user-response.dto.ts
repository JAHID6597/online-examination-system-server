import { ApiResponseProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { BaseResponseDTO } from 'src/common/dto/base-response.dto';
import { UserRoleEnum } from '../enum/user-role.enum';

export class UserResponseDTO extends BaseResponseDTO {
  @ApiResponseProperty()
  id: string;

  @ApiResponseProperty()
  username: string;

  @ApiResponseProperty()
  email: string;

  @ApiResponseProperty({ enum: UserRoleEnum })
  @IsEnum(UserRoleEnum)
  role: UserRoleEnum;
}
