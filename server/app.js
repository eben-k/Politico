import express from 'express';
import bodyParser from 'body-parser';
import route from './routes/routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1', route);

app.use('*', (req, res, next) => {
  res.status(404).json({
    message: 'Page not found',
  });
  next();
});


app.listen(port);

export default app;
