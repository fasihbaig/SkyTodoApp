export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USER_NAME,
      password: process.env.DB_PASSWORD,
      dbName: process.env.DB_NAME,
      authSource: process.env.DB_AUTH_SOURCE
    },
    auth: {
        passwordSaltRound: parseInt(process.env.PASSWORD_SALT_ROUND, 10)  || 10,
        jwtSecret: process.env.JWT_SECRET,
        jwtTokenExpiryTimeSec : parseInt(process.env.JWT_TOKEN_EXPIRY_TIME_SEC, 10) || 3600
    }
  } as GLOBAL_CONFIG
);

export type GLOBAL_CONFIG = {
  port: number,
  database: {
    host: string,
    port: number,
    username: string,
    password: string,
    dbName: string,
    authSource: string
  },
  auth: {
      passwordSaltRound: number,
      jwtSecret: string
  }
}