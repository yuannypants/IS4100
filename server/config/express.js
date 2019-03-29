import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import methodOverride from 'method-override';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import * as firebase from 'firebase'
import constant from './directory'

let app = express();

require('dotenv').config();

app.set('port',  normalizePort(process.env.APP_PORT || '3000'));
app.set('host',  process.env.APP_HOST || 'localhost');

// Middlewares
app.use(cors({ origin: true }));
app.use(helmet());
app.use(compression());
app.use(methodOverride());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(constant.assetsDir));

// Initialise Firebase
// firebase.initializeApp({
//   apiKey: "someAPIKey",
//   authDomain: "something.firebaseapp.com",
//   databaseURL: "https://something.firebaseio.com",
//   projectId: "something",
//   storageBucket: "something.appspot.com",
//   messagingSenderId: "1234567890"
// });

export default app;

function normalizePort(value) {
  let port = parseInt(value, 10);

  if (isNaN(port)) // named pipe
    return value;

  if (port >= 0) // port number
    return port;

  return false;
}
