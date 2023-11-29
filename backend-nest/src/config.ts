export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      name: process.env.DB_USER_NAME,
      password: process.env.DB_PASSWORD,
      dbName: process.env.DB_NAME
    },
    auth: {
        passwordSaltRound: parseInt(process.env.PASSWORD_SALT_ROUND, 10)  || 10,
        jwtSecret: process.env.JWT_SECRET
    }
  } as GLOBAL_CONFIG
);

export type GLOBAL_CONFIG = {
  port: number,
  database: {
    host: string,
    port: number,
    name: string,
    password: string,
    dbName: string
  },
  auth: {
      passwordSaltRound: number,
      jwtSecret: string
  }
}