import { cep } from 'cep-promise';

export const isCep = async (value: string): Promise<boolean> => {
  try {
    await cep(value);
    return true;
  } catch (err) {
    return false;
  }
};
