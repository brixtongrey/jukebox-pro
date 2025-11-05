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
        const hashPassword = await bcrypt.hash(password, 10);
        const {
            rows: [user],
        } = await db.query(sql, [username, hashedPassword]);
        return user;
   } catch (error) {
    console.error("There was an error creating user", error);
   }
}
