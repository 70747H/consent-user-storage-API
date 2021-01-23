import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const { url } = request;
    const { name } = exception;
    let status = exception.getStatus();

    if (status === 400) {
      status = HttpStatus.UNPROCESSABLE_ENTITY;
      exception.message.statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
      exception.message.error = 'Unprocessable Entity';
    }

    const errorResponse = {
      path: url,
      status,
      message: name,
    };

    response.status(status).json(errorResponse);
  }
}
