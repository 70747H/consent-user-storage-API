import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { InsertValuesMissingError } from 'typeorm/error/InsertValuesMissingError';
import { UpdateValuesMissingError } from 'typeorm/error/UpdateValuesMissingError';

@Catch(QueryFailedError, EntityNotFoundError, InsertValuesMissingError, UpdateValuesMissingError)
export class QueryFailedExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const { url } = request;
    const { name } = exception;

    const errorResponse = {
      path: url,
      message: name,
    };

    response.status(HttpStatus.BAD_REQUEST).json(errorResponse);
  }
}
