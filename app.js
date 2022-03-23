const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');


// swaggerUI
const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');

// Conexión base de datos
const mongoose = require('mongoose');

const uri = 'mongodb+srv://afranval:th251131%24%24%24@cluster0.rc7qz.mongodb.net/edge-test';
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

/**
 * Swagger route
 */
app.use(
  '/api-docs',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);
/**
 * Api route
 */
app.use('/api', require('./routes/note'));
app.use('/api', require('./routes/users'));
app.use('/api', require('./routes/login'));

app.get('/',  (req, res) => {
  res.send('Getting /api/ -->');
});

// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'),  () => {
  console.log('App listening on port:'+ app.get('port'));
});