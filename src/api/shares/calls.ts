import axios from 'axios';
import { getBackendApiUrl } from '@/utils/backend';

const headers = { Accept: 'application/json' };
const backendUrl = getBackendApiUrl();

export const getSharesList = async () => {
  return axios
    .get(`${backendUrl}/api/shares`, { headers, withCredentials: true })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const getSharedSession = async (sharedSessionId: string) => {
  return axios
    .get(`${backendUrl}/api/shares/${sharedSessionId}`, { headers, withCredentials: true })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const putSharedSession = async (sharedSessionId: string, metadata: any = {}) => {
  return axios
    .put(`${backendUrl}/api/shares/${sharedSessionId}`, metadata, {
      withCredentials: true,
      headers,
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const deleteSharedSession = async (sharedSessionId: string) => {
  return axios
    .delete(`${backendUrl}/api/shares/${sharedSessionId}`, {
      withCredentials: true,
      headers,
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const postCreateSharedSession = async (sessionId: string, metadata: any = {}) => {
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
