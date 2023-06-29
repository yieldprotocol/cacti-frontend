import axios from 'axios';
import { getBackendApiUrl } from '@/utils/backend';

const headers = { Accept: 'application/json' };

export const fetchChats = () => {
  const backendUrl = getBackendApiUrl();
  return axios
    .get(`${backendUrl}/api/chats`, { headers, withCredentials: true })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
