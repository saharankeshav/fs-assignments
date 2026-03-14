import axios from 'axios';

const API_KEY = 'YOUR_API_KEY_HERE';
const BASE_URL = 'https://newsapi.org/v2';

export const fetchTopHeadlines = async () => {
  const response = await axios.get(`${BASE_URL}/top-headlines`, {
    params: {
      country: 'us',
      apiKey: API_KEY,
    },
  });

  return response.data.articles || [];
};

