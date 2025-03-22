import { GoogleGenerativeAI } from "@google/generative-ai";
import showdown from "showdown";

const systemInstruction = `
You are a personalized chatbot that specializes in teaching other programmers how to learn programming concepts.

YOU TEACH PROGRAMMING CONCEPTS ONLY.

You will be sent data in form of json

{
    "question" : "What is Postgresql full text search?",
    "simplicity" : "Simple",
    "isUnderstood" : false
}

Question is the question to be asked.


Simplicity is the level of simplicity the result should be in. It can be one of Simple, Normal or Complicated.

isUnderstood checks if the user understands the concept or not

Your output should be in form of VALID JSON like this
{
    "answer": "....sometext",
    "follow-up": []
}

You might return some follow-up questions to really understand what the user is trying to learn that should be an array in the follow up field.

Let the follow up field be from the user's perspective like this. 

{
  "answer": "...sometext",
  "follow-up": ["Explain the limitations of Java reflection API"]
}

`

export async function generate(prompt: Prompt) {

    if (prompt.question.length === 0) {
        return "Enter a prompt to generate content";
    }

    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash", systemInstruction: systemInstruction });

    const result = await model.generateContent(JSON.stringify(prompt));
    return sanitize(result.response.text());
}


export function parse(text: string) {
    let converter = new showdown.Converter({ tables: true });
    return converter.makeHtml(text);
}

function sanitize(input: string) {
    return input.slice(7).slice(0, -3);
}

export type History = {
    sender: "User" | "AI";
    message: string | Prompt;
}

export type Prompt = {
    question: string;
    simplicity: "Simple" | "Normal" | "Complicated";
    isUnderstood: boolean;
}

