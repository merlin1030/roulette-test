import express from 'express';
import path from 'path';

//database
import { connectDB } from './db/db';
// middlewares
import { checkCreditsMiddleware } from './middlewares/checkCreditsMiddleware';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
// routes
import indexRouter from './routes/index';
import rouletteRoutes from './routes/rouletteRoutes';

const app = express();

connectDB();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkCreditsMiddleware);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', indexRouter);
app.use('/roulette', rouletteRoutes);

export default app;