import 'colors';
import http from 'http';

import app from './app';

import { configs } from './utils/configs.util';
import { connectDb } from './services/mongo/index.service';

async function startServer() {
    await connectDb(() => {
        const httpServer = http.createServer(app);

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
