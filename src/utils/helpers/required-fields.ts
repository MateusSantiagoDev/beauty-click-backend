import { Exceptions } from '../exceptions/exception';
import { ExceptionType } from '../exceptions/exceptions-protocols';

export function ValidationRequiredFields(
  dto: any,
  requiredFields: string[],
): void {
  for (const field of requiredFields) {
    if (!dto[field]) {
      throw new Exceptions(
        ExceptionType.InvalidData,
        'por favor Informe todos os campos',
      );
    }
  }
}
