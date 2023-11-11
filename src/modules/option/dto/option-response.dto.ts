import { ApiResponseProperty } from '@nestjs/swagger';
import { BaseResponseDTO } from 'src/common/dto/base-response.dto';

export class OptionResponseDTO extends BaseResponseDTO {
  @ApiResponseProperty()
  id: string;

  @ApiResponseProperty()
  title: string;

  @ApiResponseProperty()
  is_correct: boolean;
}
