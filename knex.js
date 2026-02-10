import knexLib from 'knex';
import config from './knexfile.js';

const knex = knexLib(config.development);

export default knex;