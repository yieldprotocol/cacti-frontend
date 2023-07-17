import axios from 'axios';
import { getBackendApiUrl } from '@/utils/backend';

const headers = { Accept: 'application/json' };

export const postCloneSession = (sessionId: string, metadata: any = {}) => {
  const backendUrl = getBackendApiUrl();
  return axios
    .post(`${backendUrl}/api/clone_session/${sessionId}`, metadata, {
      withCredentials: true,
      headers,
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
