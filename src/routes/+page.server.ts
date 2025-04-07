import type { Actions } from "./$types"
import { db } from "$lib/server/db"
import { Quiz } from "$lib/server/db/schema"
import { nanoid } from "nanoid"
import { redirect } from "@sveltejs/kit"
import { generateContent } from "$lib/utils/ai"

export const actions: Actions = {
    default: async function ({ request }) {

        const form = await request.formData()

        const topic = form.get('topic')!.toString()

        const result = await generateContent(topic)

        const id = nanoid(10)
        await db.insert(Quiz).values({ id, topic, content: result })

        redirect(302, `/quiz/${id}`);
    }
}