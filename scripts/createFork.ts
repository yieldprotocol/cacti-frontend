import axios from 'axios';
import { config } from 'dotenv';

config();

const { TENDERLY_USER, TENDERLY_PROJECT, TENDERLY_ACCESS_KEY } = process.env;
const TENDERLY_FORK_API = `https://api.tenderly.co/api/v1/account/${TENDERLY_USER}/project/${TENDERLY_PROJECT}/fork`;

const body = {
  network_id: '1', // network you wish to fork
  // block_number: 'latest',
  chain_config: {
    chain_id: 1, // chain_id used in the forked enviroment
  },
};

const createFork = async () =>
  axios.post(TENDERLY_FORK_API, body, {
    headers: {
      'X-Access-Key': TENDERLY_ACCESS_KEY || '',
      'Content-Type': 'application/json',
    },
  });
createFork();
