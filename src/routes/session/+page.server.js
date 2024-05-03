import db from '$lib/db.server';
import { categories, options, people, events, votes } from '$lib/db/schema';

export async function load() {
    const categories_rows = await db.select().from(categories);
    const people_rows = await db.select().from(people).orderBy(people.name);
    const options_rows = await db.select().from(options).orderBy(options.name);

    return { categories_rows, people_rows, options_rows };
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

            const options_rows = await db.select().from(options);

            // TODO migrate result calc to query-based, so that it can be used for any event
            // TODO add resultsByPerson, to show people's actual votes as a recap/validation
            const resultsByOption = (event_votes || [])
                .reduce((acc, vote) => {
                    const { optionId, value } = vote;

                    const option = options_rows.find((option) => option.id === optionId);
                    const optionAcc = acc.find((el) => el.name === option.name);

                    if (optionAcc) {
                        optionAcc.score += value;
                    } else {
                        acc.push({
                            name: option.name,
                            score: value
                        });
                    }

                    return acc;
                }, [])
                .sort((a, b) => b.score - a.score);

            const isTie = resultsByOption.length > 1 && resultsByOption[0].score === resultsByOption[1].score;

            return { success: true, event, resultsByOption, isTie };
        } catch (error) {
            return { success: false };
        }
    }
};
