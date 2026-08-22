import { parseArgs } from "util";
import {
  createSilhouetteHomeDir,
  heartbeats,
  logger,
  readConfig,
  setupDatabase,
  writeHeartbeatsToDb,
} from "shared";
import type { Heartbeat } from "./lib/types";

const { positionals } = parseArgs({ allowPositionals: true });
const command = positionals[0]; // "start" | "stop" | etc.

if (command === "start") {
  /* ... */
  await createSilhouetteHomeDir();
  const db = setupDatabase();
  const cfg = await readConfig();
  const server = Bun.serve({
    port: cfg.settings.port,
    routes: {
      "/api/v1/users/current/heartbeats.bulk": {
        POST: async (req) => {
          const body = (await req.json()) as Heartbeat[];

          if (cfg.settings.debug)
            logger("DEBUG", "Stethoscope", JSON.stringify(body));

          //Persist to db
          await writeHeartbeatsToDb(db, heartbeats, body);

          return Response.json(
            {
              responses: body.map((hb: unknown) => [hb, 201]),
            },
            { status: 201 },
          );
        },
      },
    },
  });

  console.log(`Running now at ${server.url}`);
} else if (command === "stop") {
  /* ... */
}
