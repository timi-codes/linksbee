export default () => ({
  port: parseInt(process.env.PORT, 10) || 4000,
  jwt: {
    secret: process.env.JWT_SECRET,
    signOptions: {
      audience: process.env.JWT_AUD,
      issuer: process.env.JWT_ISS,
      expiresIn: process.env.JWT_EXP || '14d',
    },
  },
  db: {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST || 'localhost',
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    database: process.env.DB_NAME,
    entities: ['dist/**/*.entity.{ts,js}'],
    synchronize: true,
  },
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
  },
  mongo: {
    uri: process.env.MONGO_URI,
    dbName: process.env.MONGO_DB,
  },
});
