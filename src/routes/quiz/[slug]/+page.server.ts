import { db } from "$lib/server/db";
import { Quiz } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async function ({params}) {
    const id = params.slug;

    //fetch from database
    const result = await db.select().from(Quiz).where(eq(Quiz.id, id));

    if (result === undefined){
        error(404, "Not found")
    }
    
    return {quiz: result[0]};
}