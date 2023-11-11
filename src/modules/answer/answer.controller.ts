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
import { ResultResponseDTO } from '../result/dto/result-response.dto';
import { UserPayload } from '../user/user-auth/dto/user-payload.dto';
import { SwaggerResponseType } from './../../common/type/swagger-response.type';
import { AnswerService } from './answer.service';
import { AnswerResponseDTO } from './dto/answer-response.dto';
import { CreateAnswerListDTO } from './dto/create-answer.dto';

@ApiTags('Answer')
@ApiGuard()
@Controller('answer')
@ApiSecurity('JWT-AUTH')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @ApiOkResponse({ type: SwaggerResponseType(ResultResponseDTO) })
  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  public async createAnswers(
    @Body() body: CreateAnswerListDTO,
    @CurrentUser() user: UserPayload,
  ) {
    return await this.answerService.createAnswers(body, user);
  }

  @ApiOkResponse({ type: SwaggerResponseType(AnswerResponseDTO, true) })
  @HttpCode(HttpStatus.OK)
  @Get('all-by-participant')
  public async findBy(@CurrentUser() user: UserPayload) {
    return await this.answerService.findBy('user_id', user.user_id);
  }
}
