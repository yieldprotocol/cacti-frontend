import axios from 'axios';
import { getBackendApiUrl } from '@/utils/backend';

const headers = { Accept: 'application/json' };
const backendUrl = getBackendApiUrl();

export const getSharesList = () => {
  return axios
    .get(`${backendUrl}/api/shares`, { headers, withCredentials: true })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const getSharedSession = (sharedSessionId: string) => {
  return axios
    .get(`${backendUrl}/api/shares/${sharedSessionId}`, { headers, withCredentials: true })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const putSharedSession = (sharedSessionId: string, metadata: any = {}) => {
  return axios
    .put(`${backendUrl}/api/shares/${sharedSessionId}`, metadata, {
      withCredentials: true,
      headers,
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const deleteSharedSession = (sharedSessionId: string) => {
  return axios
    .delete(`${backendUrl}/api/shares/${sharedSessionId}`, {
      withCredentials: true,
      headers,
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const postCreateSharedSession = (sessionId: string, metadata: any = {}) => {
  return axios
    .post(
      `${backendUrl}/api/shares`,
      { chatSessionId: sessionId, ...metadata },
      {
        withCredentials: true,
        headers,
      }
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
