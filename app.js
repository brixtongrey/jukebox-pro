import express from "express";
import morgan from "morgan";

// routers
import usersRouter from "#api/users";
import tracksRouter from "#api/tracks";
import playlistsRouter from "#api/playlists";

// import middleware
import getUserFromToken from "./middleware/getUserFromToken.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// attach token middleware
app.use(getUserFromToken);

// routers
app.use("/users", usersRouter);
app.use("/tracks", tracksRouter);
app.use("/playlists", playlistsRouter);

app.use((err, req, res, next) => {
  // A switch statement can be used instead of if statements
  // when multiple cases are handled the same way.
  switch (err.code) {
    // Invalid type
    case "22P02":
      return res.status(400).send(err.message);
    // Unique constraint violation
    case "23505":
    // Foreign key violation
    case "23503":
      return res.status(400).send(err.detail);
    default:
      next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});

export default app;