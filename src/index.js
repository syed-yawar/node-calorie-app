import config from './config/config';
import app from './server/expressApp';

require('./server/routes');

const server = require('http').Server(app);

server.listen(`${config.port}`, () => {
    console.log(`Server now listening at localhost:${config.port}`);
});
