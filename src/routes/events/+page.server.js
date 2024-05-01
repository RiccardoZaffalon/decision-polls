import { eq } from "drizzle-orm";

import db from "$lib/db.server";
import { events, votes } from "$lib/db/schema";

export async function load() {
    // const events_rows = await db.select().from(votes).leftJoin(events, eq(votes.eventId, events.id));

    // return { events_rows };
}
