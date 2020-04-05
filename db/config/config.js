require('dotenv').config()

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: console.log
  },
  production: {
    username: process.env.RDS_USERNAME, 
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DB_NAME,
    host: process.env.RDS_DB_HOSTNAME,
      port: process.env.RDS_PORT,
      logging: console.log,
      maxConcurrentQueries: 100,
      dialect: 'postgres',
      dialectOptions: {
          ssl:'Amazon RDS'
      },
      pool: { maxConnections: 5, maxIdleTime: 30},
      language: 'en'
}
}

