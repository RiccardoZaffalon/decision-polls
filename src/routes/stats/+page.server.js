import { and, desc, eq, gt, sum, avg, count } from 'drizzle-orm';

import db from "$lib/db.server";
import { votes, options, events } from "$lib/db/schema";

export async function load() {
    const GO_LIVE_DATE = 1717185097160;

    const stats = await db
        .select({
            optionId: votes.optionId,
            optionName: options.name,
            totalVotes: count(),
            averageVote: avg(votes.value),
            sumVotes: sum(votes.value),
        })
        .from(votes)
        .leftJoin(options, eq(options.id, votes.optionId))
        .leftJoin(events, eq(events.id, votes.eventId))
        .where(and(
            gt(votes.value, 0),
            eq(events.type, 'game'),
            gt(events.timestamp, GO_LIVE_DATE)
        ))
        .groupBy(votes.optionId)
        .orderBy(desc(sum(votes.value)))
        .limit(50);

    return { title: "Statistiche", stats };
}
