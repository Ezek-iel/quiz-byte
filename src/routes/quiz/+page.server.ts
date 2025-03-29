import type { PageServerLoad } from "./$types";
export const load: PageServerLoad = async function ({url}) {
    const topic = url.searchParams.get('topic')!
    return {topic}
}