import { Sequelize } from "sequelize";
import {
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
  MYSQL_PORT,
} from "../utils/config.js";
import { info, error } from "../utils/logger.js";

info("Connecting to mysql...");

const pool = new Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, {
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  dialect: "mysql",
  timezone: "-05:00",
  logging: (msg) => info(msg),
});

const connectDB = async () => {
  try {
    await pool.authenticate();
    info("Connected to MySQL database");

    // Sync all models with the database
    // force (develop) / alter (production)
    // await pool.sync({ alter: true })
    // info('Models synchronized with the database')
  } catch (e) {
    error("Error connecting to MySQL database", e);
  }
};

connectDB();

export default pool;
