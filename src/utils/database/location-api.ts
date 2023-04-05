import axios from 'axios';

export const LocationApi = async (address: string): Promise<any> => {
  const url = process.env.BASE_URL;
  const key = process.env.API_KEY;

  const response = await axios.get(url, {
    params: {
      address,
      key,
    },
  });
  if (response.data.results && response.data.results.length > 0) {
    return response.data.results[0];
  } else {
    return undefined;
  }
};
