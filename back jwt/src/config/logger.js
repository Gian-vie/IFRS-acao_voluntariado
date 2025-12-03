const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.json() // Log estruturado!
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ 
      filename: 'logs/server.log', // Um arquivo dedicado para logs do servidor
      maxsize: 5242880, // 5MB
      maxFiles: 5 // Manter até 5 arquivos de backup
    })
  ],
});

module.exports = logger;