import Connection from './connection';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
// app.options('/api/*', cors()); // enable pre-flight request for DELETE request

app.use(cors());
app.options('*', cors());

app.use(express.static('public'));
app.set('view engine', 'pug');

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
// });

Connection.buildConnections();

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);

export default app;
