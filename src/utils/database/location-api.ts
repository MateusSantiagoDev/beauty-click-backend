import axios from 'axios';

export const LocationMethod = async (address: string): Promise<any> => {
  const url = process.env.BASE_URL;
  const key = process.env.API_KEY;

  return await axios.get(url, {
    params: {
      address,
      key,
    },
  });
}