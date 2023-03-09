import mongoose from 'mongoose';
import logger from '../utils/logger';

import config from '../config/config';

const mongoConnection = () => {
    try {
        mongoose
            .connect(config.mongoUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true,
                keepAlive: true,
            })
            .then(() => logger.log({ message: 'Mongo connection built successful.', level: 'info' }));

        mongoose.connection.on('error', () => {
            logger.log({
                level: 'error',
                message: 'MongoDB connection error. Please make sure MongoDB is running.',
            });
        });
    } catch (error) {
        logger.log({
            level: 'error',
            message: error.message,
        });
    }
};

export default mongoConnection;
