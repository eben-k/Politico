import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Politico!',
  });
});

app.use('*', (req, res, next) => {
  res.status(404).json({
    message: 'Page not found',
  });
  next();
});


app.listen(port);

export default app;
