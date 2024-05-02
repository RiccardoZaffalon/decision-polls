import { error, json } from '@sveltejs/kit';
import { eq } from "drizzle-orm";

import db from '$lib/db.server';
import { options } from '$lib/db/schema';

export async function POST({ request }) {
    const { name, type } = await request.json();

    const insert = await db.insert(options).values({ name, type }).returning();

    if (!insert) return error(400, { message: 'POST' });

    const [option] = insert;

    return json(option);
}

export async function DELETE({ request }) {
    const { id } = await request.json();

    const deleted = await db.delete(options).where(eq(options.id, id));

    if (!deleted) return error(400);

    return json({ removed: true });
}
