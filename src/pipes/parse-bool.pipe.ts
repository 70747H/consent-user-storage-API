import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseBoolPipe implements PipeTransform<string, boolean> {
  transform(value: string, metadata: ArgumentMetadata): boolean {
    if (!!value && !(value === 'true' || value === 'false')) {
      throw new BadRequestException('Validation failed');
    }
    return value === 'true';
  }
}
