enum EnvTag {
  Dev = 'dev',
  Prod = 'prod',
  Local = 'local',
}

const DEFAULT_ENV_TAG = EnvTag.Dev;

const BACKEND_URL_BY_ENV_TAG: { [key in EnvTag]: string } = {
  // chatweb3-backend-dev on GCP Cloud Run (runs up-to-date master)
  [EnvTag.Dev]: 'wss://chatweb3-backend-dev-go3k2a3aca-ue.a.run.app',

  // chatweb3-backend-prod on GCP Cloud Run
  [EnvTag.Prod]: 'wss://chatweb3-backend-prod-go3k2a3aca-ue.a.run.app',

  // locally running backend
  [EnvTag.Local]: 'ws://localhost:9999',
};

function isEnvTag(envTag: any): envTag is EnvTag {
  return Object.values(EnvTag).includes(envTag);
}

export const getBackendUrl = () => {
  const envTag = process.env.NEXT_PUBLIC_ENV_TAG || DEFAULT_ENV_TAG;
  if (!isEnvTag(envTag)) {
    throw Error(`Invalid env tag: ${envTag}; must be one of ${Object.values(EnvTag)}`);
  }
  return BACKEND_URL_BY_ENV_TAG[envTag];
};
