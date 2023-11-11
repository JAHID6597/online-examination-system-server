import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ApiGuard } from 'src/common/decorators/api.guard.decorator';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UserPayload } from '../user/user-auth/dto/user-payload.dto';
import { SwaggerResponseType } from './../../common/type/swagger-response.type';
import { CreateQuestionDTO } from './dto/create-question.dto';
import { QuestionResponseDTO } from './dto/question-response.dto';
import { QuestionService } from './question.service';

@ApiTags('Question')
@ApiGuard()
@Controller('question')
@ApiSecurity('JWT-AUTH')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @ApiOkResponse({ type: SwaggerResponseType(QuestionResponseDTO) })
  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  public async createQuestion(
    @Body() body: CreateQuestionDTO,
    @CurrentUser() user: UserPayload,
  ) {
    return await this.questionService.createQuestion(body, user);
  }

  @ApiOkResponse({ type: SwaggerResponseType(QuestionResponseDTO) })
  @HttpCode(HttpStatus.OK)
  @Get('all')
  public async findAllDetails(@CurrentUser() user: UserPayload) {
    return await this.questionService.findAllDetails(user);
  }
}
