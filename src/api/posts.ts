import axios from 'axios';
import { getBackendApiUrl } from '@/utils/backend';

const headers = { Accept: 'application/json' };

export const postUpdateShareSettings = (sessionId: string, metadata: any = {}) => {
  const backendUrl = getBackendApiUrl();
  return axios
    .post(`${backendUrl}/api/share_settings/${sessionId}`, metadata, {
      withCredentials: true,
      headers,
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
