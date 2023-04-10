export const IsValidDay = (value: any): boolean => {
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
    value.day.length > 0 &&
    value.day.every((day: any) => fields.includes(day)) &&
    value.day.length === new Set(value.day).size
  );
};
