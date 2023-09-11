import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import express from 'express';

import { apiRouterV1 } from './routes/api-router.v1';
import { configs } from './utils/configs/index.util';
import { serveClient } from './middlewares/serve-client';
import { errorHandler } from './middlewares/error-handler';

const app = express();

app.use(morgan('combined'));
app.use(express.json());
app.use(cors({ origin: configs.clientUrl }));
app.use(helmet());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.static(path.join(__dirname, '..', 'client-build')));

app.use('/api/v1', apiRouterV1);
app.use('/*', serveClient);
app.use(errorHandler);

export default app;
