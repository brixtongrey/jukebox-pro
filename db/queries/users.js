import bcrypt from "bcrypt";
// const bcrypt = require("bcrypt"); ^ means the same as above
import db from "#db/client";

export async function createUser (username, password) {
   try {
        const sql = `
        INSERT INTO users (username, password)
        VALUES ($1, $2)
        RETURNING *
        `;
        const hashedPassword = await bcrypt.hash(password, 10);
        const {
            rows: [user],
        } = await db.query(sql, [username, hashedPassword]);
        return user;
   } catch (error) {
    console.error("There was an error creating user", error);
    throw error;
   }
}

export async function getUserById(username) {
  const sql = `
    SELECT *
    FROM users
    WHERE username = $1
  `;
  const {
    rows: [user],
  } = await db.query(sql, [username]);
  return user || null; 
}
