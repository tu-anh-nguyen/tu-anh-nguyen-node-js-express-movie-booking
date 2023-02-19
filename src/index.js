const express = require('express');
const app = express();
const { sequelize } = require('./models');
const { handleErrors } = require('./helpers/errors');
const config = require('./config');
const router = require('./routes');

app.use(express.json());
app.use(express.static('.'));

sequelize.sync({
  alter: true,
  // force: true,
});


app.use('/api', router);
app.use(handleErrors);

app.listen(config.port);
