import { error, json } from '@sveltejs/kit';
import { eq } from "drizzle-orm";

import db from '$lib/db.server';
import { people } from '$lib/db/schema';

export async function POST({ request }) {
    const { name } = await request.json();

    const insert = await db.insert(people).values({ name }).returning();

    if (!insert) return error(400);

    const [person] = insert;

    return json(person);
}

export async function DELETE({ request }) {
    const { id } = await request.json();

    const deleted = await db.delete(people).where(eq(people.id, id));

    if (!deleted) return error(400);

    return json({ removed: true });
}
