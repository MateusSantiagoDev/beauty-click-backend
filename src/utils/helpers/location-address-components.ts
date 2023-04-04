export const ExtractAddressComponents = (components: any[]): any => {
  const addressComponents: any = {};
  components.forEach((component) => {
    if (component.types.includes('locality')) {
      addressComponents.city = component.long_name;
    }

    if (component.types.includes('administrative_area_level_1')) {
      addressComponents.state = component.long_name;
    }

    if (
      component.types.includes('sublocality_level_1') ||
      component.types.includes('neighborhood')
    ) {
      addressComponents.neighborhood = component.long_name;
    }

    if (component.types.includes('postal_code')) {
      addressComponents.postalCode = component.long_name;
    }

    if (component.types.includes('country')) {
      addressComponents.country = component.long_name;
    }
  });
  return addressComponents;
};
