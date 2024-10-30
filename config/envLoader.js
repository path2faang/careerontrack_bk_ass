import { config } from 'dotenv';

export default () => config({ path: `etc/secrets/${process.env.NODE_ENV}.env` });
