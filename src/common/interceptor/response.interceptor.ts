import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ErrorResponseDTO, SuccessResponseDTO } from '../dto/response.dto';
import { CustomErrorException } from '../exception/custom.error.exception';
import { ResponseHelperService } from '../service/response-helper.service';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, SuccessResponseDTO<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<SuccessResponseDTO<T> | ErrorResponseDTO> {
    const response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((data) => {
        const statusCode = response.statusCode || HttpStatus.OK;

        data = this.excludePassword(data);

        return ResponseHelperService.successResponse(statusCode, data);
      }),
      catchError((error) => {
        throw new CustomErrorException(error.message, error.status);
      }),
    );
  }

  private excludePassword(data: any) {
    if (typeof data === 'object' && data !== null) {
      return this.removePassword(data);
    } else if (Array.isArray(data)) {
      return data.map((item) => this.excludePassword(item));
    } else {
      if (data?.password) {
        delete data.password;
      }
      return data;
    }
  }

  private removePassword(data: any) {
    Object.keys(data).forEach((key) => {
      if (key === 'password') {
        delete data[key];
      } else {
        data[key] = this.excludePassword(data[key]);
      }
    });

    return data;
  }
}
