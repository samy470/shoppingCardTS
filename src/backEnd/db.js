import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  user: "shopuser",
  host: "localhost",
  database: "shopdb",
  password: "1234",
  port: 5432,
});
