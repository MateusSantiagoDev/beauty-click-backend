export const IsValidPhone = (phone: string | string[]): boolean => {
  const pattern = /^\(\d{2}\) \d{5}-\d{4}$/;
  if (Array.isArray(phone)) {
    return phone.every((value) => pattern.test(value));
  } else {
    return pattern.test(phone);
  }
};
