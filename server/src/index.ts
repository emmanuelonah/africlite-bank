import 'colors';

import fs from 'fs';
import path from 'path';
import https from 'https';

import app from './app';

import { configs } from './utils/configs.util';
import { connectDb } from './services/mongo/index.service';

async function startServer() {
    await connectDb(() => {
        const httpServer = https.createServer(
            {
                key: fs.readFileSync(path.join(__dirname, '..', 'key.pem')),
                cert: fs.readFileSync(path.join(__dirname, '..', 'cert.pem')),
            },
            app
        );

        httpServer.listen(configs.serverPort, () => {
            console.log(`AFRICLITE BANK SERVER STARTED`.blue.bold);
            console.log(
                `
      //\\
      |🤖|
    //____\\
      | A |
      | F |
      | I |
      | C |
      | L |
      | I |
      | T |
      | E |
      |   |
      | B |
      | A |
      | N |
      | K |
      |   |
      | S |
      | E |
      | R |
      | V |
      | E |
      | R |
    //|   |\\
   // |   | \\
 //___|___|__\\
     //_\\/_\\
 `.green
            );
            console.log(`${configs.serverUrl}`.white.underline);
        });
    });
}

startServer();
