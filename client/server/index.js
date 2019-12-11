const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const cors = require('cors')
const path = require('path');

const app = express();
const port = process.env.PORT || 5001;

//app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(pino);

app.get('/api/greeting', (req, res, next) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

// API calls
app.get('/api/hello', (req, res, next) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res, next) => {
  res.send(
    `I received your POST request. This is what you sent mee: ${req.body.post}`,
  );
});

app.listen(port, () =>
  console.log(`Express server is running and listening on port ${port}`)
);
