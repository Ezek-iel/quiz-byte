import type { PageServerLoad } from "./$types";
import type { Question } from "$lib/types";

export const load: PageServerLoad = function () {
    const question: Question[] = [{ questionText: "What is the capital of France?", options: ['Paris', 'Berlin', 'United Kingdom', 'London', 'Beijing'], answer: 0, remark: "The capital of France is paris"}, { questionText: "What is the capital of Japan?", options: ['Paris', 'Beijing', 'United Kingdom', 'Austria', 'Tokyo'], answer: 4, remark: "The capital of Japan is Tokyo"}]

    return {question}
}