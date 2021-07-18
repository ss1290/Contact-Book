const { createLogger, format, transports, config } = require('winston')
const contactlogger = createLogger({
  levels:config.syslog.levels,
  defaultMeta: { component: 'contact-service' },
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'contacts.log'})
  ]
})
 module.exports = contactlogger