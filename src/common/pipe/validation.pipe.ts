import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype, type }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype) || type !== 'body') {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors?.length) {
      throw new BadRequestException(String(this.formatErrors(errors)));
    }

    return value;
  }

  private formatErrors(errors: ValidationError[], parentProperty?: string) {
    return errors.reduce((messages, error) => {
      if (error?.children?.length) {
        const childErrors = this.formatErrors(error.children, error.property);
        messages.push(...childErrors);
      } else {
        const constraints = error.constraints;
        const property = parentProperty
          ? `${parentProperty}.${error.property}`
          : error.property;
        if (constraints) {
          const constraintsArray = Object.values(constraints);
          messages.push(`${property}: ${constraintsArray.join(', ')}`);
        } else {
          messages.push(`${property} has invalid data`);
        }
      }

      return messages;
    }, [] as string[]);
  }

  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
