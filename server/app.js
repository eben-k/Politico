import express from 'express';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import dotenv from 'dotenv';
import route from './routes/routes';


const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

app.use('/api/v1', route);

app.use('*', (req, res) => {
  res.status(404).json({
    message: 'Page not found',
  });
});

dotenv.config();

app.listen(port);

export default app;
