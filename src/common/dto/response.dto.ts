import { ApiProperty } from '@nestjs/swagger';

export class ResponseDTO {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  type: string;
}

export class SuccessResponseDTO<T> extends ResponseDTO {
  @ApiProperty({ type: Object, isArray: true, required: false })
  data?: T | T[];
}

export class ErrorResponseDTO extends ResponseDTO {
  @ApiProperty()
  message: string;
}
