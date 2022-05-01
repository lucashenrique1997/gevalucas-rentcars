const express = require('express');

const bodyParser = require('body-parser');

const rentRoutes = require('./routes');

const errorController = require('./controllers/error.controller');

const app = express();

const ports = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type, Accept,Authorization,Origin");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use('/', rentRoutes);

app.use(errorController.get404);

app.use(errorController.get500);

app.listen(ports, () => console.log(`listening on port ${ports}`));
