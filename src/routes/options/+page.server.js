import db from "$lib/db.server";
import { categories, options } from "$lib/db/schema";

export async function load() {
    const categories_rows = await db.select().from(categories).orderBy(categories.id);
    const options_rows = await db.select().from(options).orderBy(options.type, options.name);

    return { categories_rows, options_rows };
}

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const name = data.get('name');
        const type = data.get('type');

        if (!name || !type) return { success: false }

        const insert = await db.insert(options).values({ name, type });

        if (!insert) return { success: false }

        return { name, type, success: true }
    }
}