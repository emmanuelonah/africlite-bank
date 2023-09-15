import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import express from 'express';
import rateLimit from 'express-rate-limit';

import { apiRouterV1 } from './routes/api-router.v1';
import { configs } from './utils/configs/index.util';
import { serveClient } from './middlewares/serve-client';
import { errorHandler } from './middlewares/error-handler';
import { HttpException } from './services/http-exception/index.service';

const app = express();

app.use(morgan('combined'));
app.use(express.json());
app.use(cors({ origin: configs.clientUrl }));
app.use(helmet());
app.use(
    rateLimit({
        limit: 50,
        message: new HttpException(429, 'Request limit reach. Retry later.'),
    })
);
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.static(path.join(__dirname, '..', 'client-build')));

app.use('/api/v1', apiRouterV1);
app.use('/*', serveClient);
app.use(errorHandler);

export default app;
