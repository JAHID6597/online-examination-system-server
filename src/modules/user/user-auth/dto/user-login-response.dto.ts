import { ApiResponseProperty } from '@nestjs/swagger';
import { UserResponseDTO } from '../../dto/user-response.dto';

export class UserLoginResponseDTO {
  @ApiResponseProperty()
  access_token: string;

  @ApiResponseProperty()
  user: UserResponseDTO;

  constructor(accessToken: string, user: UserResponseDTO) {
    this.access_token = accessToken;
    this.user = user;
  }
}
