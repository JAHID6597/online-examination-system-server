import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json, urlencoded } from 'express';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/interceptor/response.interceptor';
import { ValidationPipe } from './common/pipe/validation.pipe';
import { SwaggerConfig } from './swagger/swagger.config';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.enableCors();
  app.use(
    helmet({
      crossOriginResourcePolicy: false,
    }),
  );

  app.setGlobalPrefix('/api/v1');

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalInterceptors(new ResponseInterceptor());

  const configService = app.get(ConfigService);

  SwaggerConfig.setupSwagger(app);

  const PORT = configService.get<number>('PORT', 3000);
  await app.listen(PORT);
  logger.log(`[main] Server is running on: ${await app.getUrl()}`);
}
bootstrap();
