import db from "$lib/db.server";
import { people } from "$lib/db/schema";

export async function load() {
    const rows = await db.select().from(people).orderBy(people.name);

    return { rows };
}

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const name = data.get('name');

        if (!name) return { success: false }

        const insert = await db.insert(people).values({ name });

        if (!insert) return { success: false }

        return { name, success: true }
    }
}