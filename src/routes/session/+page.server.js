import { eq, sum, desc } from 'drizzle-orm';

import db from '$lib/db.server';
import { categories, options, people, events, votes } from '$lib/db/schema';

export async function load() {
    const categories_rows = await db.select().from(categories);
    const people_rows = await db.select().from(people).orderBy(people.name);
    const options_rows = await db.select().from(options).orderBy(options.name);

    return { title: "Votazione", categories_rows, people_rows, options_rows };
}

export const actions = {
    default: async ({ request }) => {
        let event_votes = [];

        try {
            const data = await request.formData();
            const type = data.get('type');

            const [event] = await db.insert(events).values({ type, timestamp: Date.now() }).returning();

            if (!event) return { success: false };

            for (const [key, value] of data.entries()) {
                if (key.indexOf('vote-') === 0) {
                    const vote = key.slice(5);
                    const [person, choice] = vote.split('|');

                    if (value) {
                        event_votes.push({
                            eventId: event.id,
                            personId: parseInt(person),
                            optionId: parseInt(choice),
                            value: parseInt(value)
                        });
                    }
                }
            }

            const save = await db.insert(votes).values(event_votes);

            if (!save) return { success: false };

            const resultsByOption = await db
                .select({ name: options.name, score: sum(votes.value) })
                .from(votes)
                .leftJoin(options, eq(options.id, votes.optionId))
                .where(eq(votes.eventId, event.id))
                .groupBy(votes.optionId)
                .orderBy(desc(sum(votes.value)));

            const resultsByPerson = await db
                .select({ person_name: people.name, option_name: options.name, vote: votes.value })
                .from(options)
                .leftJoin(votes, eq(options.id, votes.optionId))
                .leftJoin(people, eq(votes.personId, people.id))
                .where(eq(votes.eventId, event.id))
                .orderBy(people.name, options.name);

            const isTie =
                resultsByOption.length > 1 && resultsByOption[0].score === resultsByOption[1].score;

            return { success: true, event, resultsByOption, isTie, resultsByPerson };
        } catch (error) {
            console.log(error);
            return { success: false };
        }
    }
};
