import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send({
    message: 'Welcome to Politico!',
  });
});


app.listen(port);

export default app;
