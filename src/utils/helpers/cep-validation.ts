import { postcodeValidator } from 'postcode-validator';

export const isCep = async (value: string): Promise<boolean> => {
  const isValid = postcodeValidator(value, 'BR');
  if (isValid) {
    return true;
  } else {
    return false;
  }
};
