const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

// swaggerUI
const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');

// Conexión base de datos
const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/edge-test';
const options = {useNewUrlParser: true, useUnifiedTopology: true};

// Or using promises
mongoose.connect(uri, options).then(
  /** ready to use. The `mongoose.connect()` promise resolves to mongoose instance. */
  () => { console.log('Conectado a DB') },
  /** handle initial connection error */
  err => { console.log(err) }
);

const app = express();

// Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(express.static(path.join(__dirname, 'public')));

require('dotenv').config();

// Rutas

app.use(
  '/api-docs',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);

app.get('/',  (req, res) => {
  res.send('Hello World!');
});

// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'),  () => {
  console.log('App listening on port:'+ app.get('port'));
});