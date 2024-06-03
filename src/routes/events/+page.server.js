import { gt } from "drizzle-orm";

import db from "$lib/db.server";
import { events } from "$lib/db/schema";

export async function load() {
    const GO_LIVE_DATE = 1717185097160;
    const events_rows = await db.select().from(events).where(gt(events.timestamp, GO_LIVE_DATE));

    return { events_rows };
}
