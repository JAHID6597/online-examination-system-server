import { ApiResponseProperty } from '@nestjs/swagger';

export class BaseResponseDTO {
  @ApiResponseProperty()
  created_at: Date;

  @ApiResponseProperty()
  created_by: string;

  @ApiResponseProperty()
  updated_at: Date;

  @ApiResponseProperty()
  updated_by: string;

  @ApiResponseProperty()
  is_active: boolean;
}
