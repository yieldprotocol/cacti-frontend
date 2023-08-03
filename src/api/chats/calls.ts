import axios from 'axios';
import { getBackendApiUrl } from '@/utils/backend';

const headers = { Accept: 'application/json' };
const backendUrl = getBackendApiUrl();

export const getChatsList = async () => {
  return axios
    .get(`${backendUrl}/api/chats`, { headers, withCredentials: true })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const getChatSettings = async (sessionId: string) => {
  return axios
    .get(`${backendUrl}/api/chats/${sessionId}`, { headers, withCredentials: true })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const putChatSettings = async (sessionId: string, metadata: any = {}) => {
  return axios
    .put(`${backendUrl}/api/chats/${sessionId}`, metadata, {
      withCredentials: true,
      headers,
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const deleteChat = async (sessionId: string) => {
  return axios
    .delete(`${backendUrl}/api/chats/${sessionId}`, {
      withCredentials: true,
      headers,
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const postCreateChatFromShareImport = async (
  sharedSessionId: string,
  metadata: any = {}
) => {
  return axios
    .post(
      `${backendUrl}/api/chats`,
      { sharedSessionId, ...metadata },
      {
        withCredentials: true,
        headers,
      }
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
