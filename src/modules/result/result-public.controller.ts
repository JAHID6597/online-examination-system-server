import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SwaggerResponseType } from './../../common/type/swagger-response.type';
import { ResultResponseDTO } from './dto/result-response.dto';
import { ResultService } from './result.service';

@ApiTags('Result')
@Controller('result')
export class ResultPublicController {
  constructor(private readonly resultService: ResultService) {}

  @ApiOkResponse({ type: SwaggerResponseType(ResultResponseDTO, true) })
  @HttpCode(HttpStatus.OK)
  @Get('all')
  public async findAll() {
    return await this.resultService.findAll();
  }
}
