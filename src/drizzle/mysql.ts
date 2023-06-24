import mysql2 from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";

const connection = await mysql2.createConnection({
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});
export const db = drizzle(connection);

if (process.env.NODE_ENV === "development") {
  // this will automatically run needed migrations on the database
  await migrate(db, {
    migrationsFolder: "./src/drizzle/migrations",
  });
}
