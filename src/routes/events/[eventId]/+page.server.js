import { eq, sum, desc } from "drizzle-orm";
import { error } from '@sveltejs/kit';

import db from "$lib/db.server";
import { options, votes } from "$lib/db/schema";

export async function load({ params }) {
    const eventId = params.eventId;

    if (!eventId) {
        error(400, 'No Event ID provided');
    }

    const resultsByOption = await db
        .select({ name: options.name, score: sum(votes.value) })
        .from(votes)
        .leftJoin(options, eq(options.id, votes.optionId))
        .where(eq(votes.eventId, eventId))
        .groupBy(votes.optionId)
        .orderBy(desc(sum(votes.value)));

    if (!resultsByOption) {
        error(404, 'Results not found');
    }


    const isTie =
        resultsByOption.length > 1 && resultsByOption[0].score === resultsByOption[1].score;

    return { resultsByOption, isTie };
}
