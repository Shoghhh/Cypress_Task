import axios from 'axios';
import { API_URL } from 'react-native-dotenv';

export async function getRequest(endpoint, params) {

  const response = await axios.get(`${API_URL}${endpoint}`, {params});
  const data = response.data;
  return data

}

