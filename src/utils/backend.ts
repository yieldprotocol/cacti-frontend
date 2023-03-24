enum EnvTag {
  Dev = 'dev',
  Prod = 'prod',
  Legacy = 'legacy',
  Local = 'local',
}

// TODO: update default to Dev once there's confidence in stability
const DEFAULT_ENV_TAG = EnvTag.Legacy;

const BACKEND_URL_BY_ENV_TAG: { [key in EnvTag]: string } = {
  // chatweb3-backend-dev on GCP Cloud Run
  [EnvTag.Dev]: 'wss://chatweb3-backend-dev-go3k2a3aca-ue.a.run.app',

  // chatweb3-backend-prod on GCP Cloud Run
  [EnvTag.Prod]: 'wss://chatweb3-backend-prod-go3k2a3aca-ue.a.run.app',

  // legacy chatweb3 AWS host
  [EnvTag.Legacy]: 'wss://chatweb3.func.ai:9998',

  // locally running backend
  [EnvTag.Local]: 'ws://localhost:9999',
};

export const getBackendUrl = () => {
  const envTagString = process.env.NEXT_PUBLIC_ENV_TAG || DEFAULT_ENV_TAG;
  if (!(envTagString in BACKEND_URL_BY_ENV_TAG)) {
    throw Error(
      `Invalid env tag: ${envTagString}; must be one of ${Object.values(BACKEND_URL_BY_ENV_TAG)}`
    );
  }
  const envTag = envTagString as EnvTag;
  return getBackendUrlForEnv(envTag);
};

const getBackendUrlForEnv = (envTag: EnvTag) => {
  return BACKEND_URL_BY_ENV_TAG[envTag];
};
