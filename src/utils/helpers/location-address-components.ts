export const ExtractAddressComponents = (components: any[]): any => {
  const componentMapping: Record<string, string> = {
    administrative_area_level_2: 'city',
    administrative_area_level_1: 'state',
    country: 'country',
    sublocality_level_1: 'neighborhood',
    postal_code: 'postalCode',
    route: 'street',
    street_number: 'number',
  };

  return components.reduce((addressComponents: any, component: any) => {
    const componentType = component.types.find((type: string) => componentMapping[type]);

    if (componentType) {
      const propertyName = componentMapping[componentType];
      addressComponents[propertyName] = component.long_name;
    }

    return addressComponents;
  }, {});
};