import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SwaggerResponseType } from './../../common/type/swagger-response.type';
import { ExamResponseDTO } from './dto/exam-response.dto';
import { ExamService } from './exam.service';

@ApiTags('Exam')
@Controller('exam')
export class ExamPublicController {
  constructor(private readonly examService: ExamService) {}

  @ApiOkResponse({ type: SwaggerResponseType(ExamResponseDTO, true) })
  @HttpCode(HttpStatus.OK)
  @Get('all')
  public async findAll() {
    return await this.examService.findAll();
  }
}
