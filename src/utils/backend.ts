enum EnvTag {
  Dev = 'dev',
  Prod = 'prod',
  Local = 'local',
}

const DEFAULT_ENV_TAG = EnvTag.Dev;

interface BackendHost {
  secure: boolean;
  host: string;
}

const BACKEND_HOST_BY_ENV_TAG: { [key in EnvTag]: BackendHost } = {
  // chatweb3-backend-dev on GCP Cloud Run (runs up-to-date master)
  [EnvTag.Dev]: { secure: true, host: 'chatweb3-backend-dev-go3k2a3aca-ue.a.run.app' },

  // chatweb3-backend-prod on GCP Cloud Run
  [EnvTag.Prod]: { secure: true, host: 'chatweb3-backend-prod-go3k2a3aca-ue.a.run.app' },

  // locally running backend
  [EnvTag.Local]: { secure: false, host: 'localhost:9999' },
};

function isEnvTag(envTag: any): envTag is EnvTag {
  return Object.values(EnvTag).includes(envTag);
}

export const getBackendHost = () => {
  const envTag = process.env.NEXT_PUBLIC_ENV_TAG || DEFAULT_ENV_TAG;
  if (!isEnvTag(envTag)) {
    throw Error(`Invalid env tag: ${envTag}; must be one of ${Object.values(EnvTag)}`);
  }
  return BACKEND_HOST_BY_ENV_TAG[envTag];
};

export const getBackendWebsocketUrl = () => {
  const { secure, host } = getBackendHost();
  return `${secure ? 'wss' : 'ws'}://${host}/chat`;
};

export const getBackendApiUrl = () => {
  const { secure, host } = getBackendHost();
  return `${secure ? 'https' : 'http'}://${host}`;
};
