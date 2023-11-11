import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ApiGuard } from 'src/common/decorators/api.guard.decorator';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UserPayload } from '../user/user-auth/dto/user-payload.dto';
import { SwaggerResponseType } from './../../common/type/swagger-response.type';
import { CreateExamDTO } from './dto/create-exam.dto';
import { ExamFullResponseDTO, ExamResponseDTO } from './dto/exam-response.dto';
import { ExamService } from './exam.service';

@ApiTags('Exam')
@ApiGuard()
@Controller('exam')
@ApiSecurity('JWT-AUTH')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @ApiOkResponse({ type: SwaggerResponseType(ExamResponseDTO) })
  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  public async createQuestion(
    @Body() body: CreateExamDTO,
    @CurrentUser() user: UserPayload,
  ) {
    return await this.examService.createExam(body, user);
  }

  @ApiOkResponse({ type: SwaggerResponseType(ExamResponseDTO, true) })
  @HttpCode(HttpStatus.OK)
  @Get('all-by-creator')
  public async findAllBy(@CurrentUser() user: UserPayload) {
    return await this.examService.findAllBy('created_by', user.user_id);
  }

  @ApiOkResponse({ type: SwaggerResponseType(ExamFullResponseDTO) })
  @HttpCode(HttpStatus.OK)
  @Get('details/:id')
  public async findExamQuestionDetails(
    @Param('id') id: string,
    @CurrentUser() user: UserPayload,
  ) {
    return await this.examService.findExamQuestionDetails(id, user);
  }
}
