import db from "$lib/db.server";
import { categories, options, people, events, votes } from "$lib/db/schema";

export async function load() {
    const categories_rows = await db.select().from(categories);
    const people_rows = await db.select().from(people).orderBy(people.name);
    const options_rows = await db.select().from(options).orderBy(options.name);

    return { categories_rows, people_rows, options_rows };
}

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const type = data.get('type');
        let event_votes = [];

        const [event] = await db.insert(events).values({ type, timestamp: Date.now() }).returning();
        if (!event) return { success: false }

        for (const [key, value] of data.entries()) {
            if (key.indexOf('vote-') === 0) {
                const vote = key.slice(5);
                const [person, choice] = vote.split('|');
                if (value) {
                    event_votes.push({ eventId: event.id, personId: parseInt(person), optionId: parseInt(choice), value: parseInt(value) });
                }
            }
        }

        const save = await db.insert(votes).values(event_votes)

        if (!save) return { success: false }

        return { success: true, event, event_votes }
    }
}
