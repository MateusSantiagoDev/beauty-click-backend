export const IsValidTime = (value: any): boolean => {
  // verifica existe hora, se a hora tem o formato correto e se é única
  const timeRegex = /^(0\d|1\d|2[0-3]):([0-5]\d):([0-5]\d)$/;

  if (
    value.startTime.length === 0 ||
    !value.startTime.every((time: any) => timeRegex.test(time)) ||
    value.startTime.length !== new Set(value.startTime).size
  ) {
    return false
  }
  return true
};
