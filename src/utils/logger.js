import config from '../config/config';
// currently we are pushing logs in local log file but in future we can push all these logs to external databases/servers like ELK and view it on kibana

const { transports, createLogger, format } = require('winston');

const logger = createLogger({
    level: 'info',
    format: format.combine(format.timestamp(), format.json()),
    defaultMeta: { service: 'calorie service' },
    transports: [
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //
        new transports.File({ filename: 'log/error.log', level: 'error' }),
        new transports.File({ filename: 'log/combined.log' }),
    ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (config.env !== 'production') {
    logger.add(
        new transports.Console({
            format: format.simple(),
        }),
        { timestamp: true },
    );
}

export default logger;
