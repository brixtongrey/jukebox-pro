import db from "#db/client";

import { createPlaylist } from "#db/queries/playlists";
import { createPlaylistTrack } from "#db/queries/playlists_tracks";
import { createTrack } from "#db/queries/tracks";
import { createUser } from "#db/queries/users";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  for (let i = 1; i <= 20; i++) {
    await createPlaylist("Playlist " + i, "lorem ipsum playlist description");
    await createTrack("Track " + i, i * 50000);
  }
  for (let i = 1; i <= 15; i++) {
    const playlistId = 1 + Math.floor(i / 2);
    await createPlaylistTrack(playlistId, i);
  }
}

  // Create 2 test users with 5 tracks each
  const user1 = await createUser("stargazernightsky", "cosmos42!");
  for (let i = 1; i <= 5; i++) {
    await createReservation(i, user1.id, 1, "1111-11-11");
  }

  const user2 = await createUser("wandereropenroad", "miles2go");
  for (let i = 3; i <= 8; i++) {
    await createReservation(i, user2.id, 2, "2222-02-20");
  }
