import { error } from '@sveltejs/kit';
import { eq } from "drizzle-orm";

import db from "$lib/db.server";
import { options } from "$lib/db/schema";

export async function load({ params }) {
    const option = await db.select().from(options).where(eq(options.id, params.slug)).limit(1);

    if (!option || !option.length) return error(400, "No option found!");

    return option[0];
}

export const actions = {
    default: async ({ params, request }) => {
        const data = await request.formData();

        const id = params.slug;
        const name = data.get('name');
        const minParticipants = data.get('minParticipants');
        const maxParticipants = data.get('maxParticipants');

        await db.update(options).set({ name, minParticipants, maxParticipants }).where(eq(options.id, id));
    }
}
