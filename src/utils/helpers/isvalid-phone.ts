export const IsValidPhone = (phone: string): boolean => {
  const pattern = /^\(\d{2}\) \d{5}-\d{4}$/;
  if (!pattern.test(phone)) {
    return false;
  }
  return true;
};
