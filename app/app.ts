import { proxysiteAiCategory } from '@/app/api/v1/proxysites.ai/category';
import { wordpressTags } from '@/app/api/v1/wordpress/tags';
import { startWatcher } from '@/app/lib/watcher';
import express, { Application } from 'express';
import logger from 'morgan';
import { authByApiKey } from './middleware/authByApiKey';
const responseTime = require('response-time');

const app: Application = express();

app.use(responseTime());
if (process.env.NODE_ENV !== "production") {
  app.use(logger('dev'));
  startWatcher();
} else {
  app.use(authByApiKey);
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1/wordpress.com/tags', wordpressTags);
app.use('/api/v1/proxysites.ai/category', proxysiteAiCategory);

export default app;   
