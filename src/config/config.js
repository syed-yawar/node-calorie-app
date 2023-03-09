require('dotenv').config();

const config = {
    env: process.env.APP_ENV,
    port: process.env.PORT || 3000,
    mongoUrl: process.env.MONGO_DB_URL || 'mongodb://mongo:27017/database',
};

export default config;
