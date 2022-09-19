import express from 'express';
import 'express-async-errors';
import route from './Routes/Export.routes';
import errorHandler from './Middleware/error.middleware';

const app = express();
app.use(express.json());

app.use('/cars', route.car);
app.use('/motorcycles', route.motorcycle);

app.use(errorHandler);

export default app;
