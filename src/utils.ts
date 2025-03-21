import { GoogleGenerativeAI } from "@google/generative-ai";
import showdown from "showdown";

export async function generate(prompt: string) {

    if (prompt.length === 0) {
        return "Enter a prompt to generate content";
    }

    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(prompt);
    return result.response.text();
}


export function parse(text: string){
    let converter = new showdown.Converter({tables: true});
    return converter.makeHtml(text);
}

export type History = {
    sender: "User" | "AI";
    message: string;
}