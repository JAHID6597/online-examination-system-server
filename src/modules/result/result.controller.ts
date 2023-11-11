import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { ApiOkResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ApiGuard } from 'src/common/decorators/api.guard.decorator';
import { SwaggerResponseType } from './../../common/type/swagger-response.type';
import { ResultResponseDTO } from './dto/result-response.dto';
import { ResultService } from './result.service';

@ApiTags('Result')
@ApiGuard()
@Controller('result')
@ApiSecurity('JWT-AUTH')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @ApiOkResponse({ type: SwaggerResponseType(ResultResponseDTO, true) })
  @HttpCode(HttpStatus.OK)
  @Get('attempted-exam-result/:attemptId')
  public async findAttemptedExamResult(@Param('attemptId') attemptId: string) {
    return await this.resultService.findOneBy('attempt_id', attemptId);
  }
}
