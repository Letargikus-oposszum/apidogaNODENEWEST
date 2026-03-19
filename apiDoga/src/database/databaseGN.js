import Database from "better-sqlite3";

const db = new Database("./src/database/database.sqlite");

export default db;
