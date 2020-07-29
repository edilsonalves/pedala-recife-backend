import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const database = process.env.DATABASE;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const host = process.env.HOST;

const sequelize = new Sequelize(`${database}`, `${username}`, `${password}`, {
  host: `${host}`,
  dialect: 'postgres',
  logging: false,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database successfully connected');
  } catch (error) {
    console.error(`Unable to connect database: ${error}`);
  }
})();

(async () => {
  try {
    await sequelize.sync();
    console.log('Models successfully synchronized');
  } catch (error) {
    console.error(`Unable to sync models: ${error}`);
  }
})();

export default sequelize;
