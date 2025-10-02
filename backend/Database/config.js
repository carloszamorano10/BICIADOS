import pg from "pg";
import "dotenv/config";

const { DB_DATABASE, DB_HOST, DB_PASS, DB_USER } = process.env;

const pool = new pg.Pool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_DATABASE,
  allowExitOnIdle: true,
});

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.log("error connecting to db", err);
  } else {
    console.log("db conectado", res.rows[0]);
  }
});

export default pool;