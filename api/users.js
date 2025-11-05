import express from "express";
import bcrypt from "bcrypt";

import { createUser, getUserById } from "#db/queries/users";
import requireBody from "#middleware/requireBody";
import requireUser from "#middleware/requireUser";
import { createToken } from "#utils/jwt";

const router = express.Router();
export default router;


router.post(
    "/register",
    requireBody(["username", "password"]),
  async (req, res) => {
    const { username, password } = req.body;
    const user = await createUser(username, password);
    const token = createToken({ id: user.id });
    res.status(201).send(token);
  },
);

router.post("/login", 
    requireBody(["username", "password"]), async (req, res) => {
  const { username, password } = req.body;
  const user = await getUserById(username);
  if (!user) return res.status(401).send("Invalid email or password.");
  const token = createToken({ id: user.id });
  res.send(token);
});


