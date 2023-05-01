import axios from 'axios';
import { AddressLocationRepository } from '../../address-location/repository/address-location-repository';
import { CreateAddressLocationDto } from 'src/address-location/dto/create-address-location.dto';

export const PlacesLocationApi = async (
  neighborhood: CreateAddressLocationDto,
  respsitory: AddressLocationRepository,
): Promise<any[]> => {
  const apiKey = process.env.API_KEY;

  // busca os endereços salvos na aplicação
  const savedAddresses = await respsitory.getSavedAddresses();

  // filtra os endereços pelo bairro especificado
  const filteredAddresses = savedAddresses.filter(
    (address) => address.neighborhood === neighborhood,
  );

  // coordenadas que serão parametros para a busca na api
  const radius = 1000;
  const types = ['beauty_salon', 'barber'];
  const type = types.join('|');

  const nearbyPlaces = [];
  for (const address of filteredAddresses) {
    // busca as coordenadas do endereço
    const location = await respsitory.getLocationByAddress(
      address.neighborhood,
    );

    // mapeia a latitude e longitude
    const coordinates = `${location.map((la) => la.latitude)} ${location.map(
      (lo) => lo.longitude,
    )}`;

    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coordinates}&radius=${radius}&type=${type}&key=${apiKey}`;

    const response = await axios.get(url);

    if (response.status === 200) {
      const results = response.data.results.map((result) => ({
        name: result.name,
        address: result.vicinity,
        latitude: result.geometry.location.lat,
        longitude: result.geometry.location.lng,
      }));
      nearbyPlaces.push(...results);
    }
  }
  if (nearbyPlaces && nearbyPlaces.length > 0) {
    return nearbyPlaces;
  } else {
    return undefined;
  }
};
