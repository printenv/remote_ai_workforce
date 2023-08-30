import winston from "winston"

const wpLogger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [
        new winston.transports.File({
            filename: './logs/wp/error.log',
            level: 'error'
        }),
        new winston.transports.Console({
            format: winston.format.simple()
        })
    ]
})

export default wpLogger