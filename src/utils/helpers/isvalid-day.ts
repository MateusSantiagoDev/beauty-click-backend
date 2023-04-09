export const IsValidDay = (dto: any): boolean => {
  const fields = [
    'segunda-feira',
    'terça-feira',
    'quarta-feira',
    'quinta-feira',
    'sexta-feira',
    'sabado',
    'domingo',
  ];

  // verificando se existe day, se ele faz parte do objeto fields e se ele é único
  return (
    dto.day.length > 0 &&
    dto.day.every((day: any) => fields.includes(day)) &&
    dto.day.length === new Set(dto.day).size
  );
};
