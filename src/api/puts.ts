import axios from 'axios';
import { getBackendApiUrl } from '@/utils/backend';

const headers = { Accept: 'application/json' };

export const putShareSettings = (sessionId: string, metadata: any = {}) => {
  const backendUrl = getBackendApiUrl();
  return axios
    .put(`${backendUrl}/api/share_settings/${sessionId}`, metadata, {
      withCredentials: true,
      headers,
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
