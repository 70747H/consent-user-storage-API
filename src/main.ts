import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerOptions } from './options/swagger.options';
import { SwaggerModule } from '@nestjs/swagger';
import { QueryFailedExceptionFilter } from './filters/query-failed-exception.filter';
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('docs', app, document);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new QueryFailedExceptionFilter());
  await app.listen(8000);
}

bootstrap().then();
