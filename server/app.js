import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import errorController from './controllers/errorController.js';
import userRoute from './routes/userRoute.js';
import authRoute from './routes/authRoute.js';
import conversationRoute from './routes/conversationRoute.js';
import messageRoute from './routes/messageRoute.js';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

dotenv.config({ path: path.join(path.resolve(), '/.env') });

app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));

app.use('/api/v1/users', userRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/conversations', conversationRoute);
app.use('/api/v1/messages', messageRoute);

app.use('*', (req, res) => {
  res.status(400).json({
    status: 'fail',
    message: 'Page not found!',
  });
});

app.use(errorController);

export default app;
