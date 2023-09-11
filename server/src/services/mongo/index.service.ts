import 'colors';
import mongoose from 'mongoose';

import { configs } from '../../utils/configs/index.util';

mongoose.connection.on('open', () => {
    console.info(`🔑🔑🔑 Db connected on: ${configs.serverDbUri}`.green.underline);
});

mongoose.connection.on('error', (error) => {
    console.error(`🔒🔒🔒 Failed to connect to DB: ${error}`.red);
});

mongoose.connection.on('disconnected', () => {
    console.info(`🔐🔐🔐 Db disconnected`);
});

async function connectDb(onSuccess: () => void) {
    try {
        await mongoose.connect(configs.serverDbUri);
        onSuccess();
    } catch (error) {
        console.error(error);
    }
}

async function disconnectDb() {
    try {
        await mongoose.disconnect();
        console.info('Successfully disconnected db');
    } catch (error) {
        console.error(error);
    }
}

export { connectDb, disconnectDb };
