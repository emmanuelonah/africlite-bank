import env from 'dotenv';
import envVar from 'env-var';

env.config();

export const configs = {
    serverPort: envVar.get('AFRICLITE_BANK_SERVER_PORT').required().asPortNumber(),
    serverUrl: envVar.get('AFRICLITE_BANK_SERVER_URL').required().asUrlString(),
    serverDbUri: envVar.get('AFRICLITE_BANK_SERVER_DB_URI').required().asUrlString(),
    clientPort: envVar.get('AFRICLITE_BANK_CLIENT_PORT').required().asPortNumber(),
    clientUrl: envVar.get('AFRICLITE_BANK_CLIENT_URL').required().asUrlString(),
};
