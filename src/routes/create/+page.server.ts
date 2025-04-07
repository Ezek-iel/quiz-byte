import type { Actions } from "./$types";
import { generateContent } from "$lib/utils";
import { db } from "$lib/server/db";
import { Quiz } from "$lib/server/db/schema";
import { nanoid } from "nanoid";
import { redirect } from "@sveltejs/kit";

export const actions: Actions = {
    default: async function ({ request }) {
        const form = await request.formData();
        const topic = String(form.get('topic'))

        const response = await generateContent(topic);

        const id = nanoid(10);
        //Save response to database;
        await db.insert(Quiz).values({ id, topic, content: response });

        redirect(303, `/quiz/${id}`);
    }
}
