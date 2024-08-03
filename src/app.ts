import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import bookRoutes from './routes/bookRoutes';

const app = express();

app.use(express.json());

app.use(bodyParser.json());
app.use('/users', userRoutes);
app.use('/api', bookRoutes);

export default app;