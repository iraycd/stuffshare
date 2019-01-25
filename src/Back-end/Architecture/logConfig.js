import winston  from 'winston';
import path  from 'path';
import 'winston-daily-rotate-file';


const Logger = new(winston.Logger)({
    transports: [
        new(winston.transports.DailyRotateFile)({
            name: 'info-file',
            datePattern: '.yyyy-MM-dd',
            filename: process.env.LOGS_PATH?process.env.LOGS_PATH+"\\filelog-info.log":path.join(__dirname, "logs", 'filelog-info.log'),
            level: 'info'
        }),
        new(winston.transports.DailyRotateFile)({
            name: 'error-file',
            datePattern: '.yyyy-MM-dd',
            filename: process.env.LOGS_PATH?process.env.LOGS_PATH+"\\filelog-info.log":path.join(__dirname, "logs/error", 'filelog-error.log'),
            level: 'error'
        })
    ]
});


export default Logger;
