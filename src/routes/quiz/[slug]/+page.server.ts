import type { PageServerLoad } from "./$types";
import { Quiz } from "$lib/server/db/schema"
import { db } from "$lib/server/db";
import { eq } from "drizzle-orm";


export const load: PageServerLoad = async function ({ params }) {
    const slug = params.slug;
    const result = await db.select().from(Quiz).where(eq(Quiz.id, slug))
    return result[0]
}