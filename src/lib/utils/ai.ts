import { GoogleGenerativeAI, type Schema, SchemaType } from "@google/generative-ai";

//* --- System Instruction ---
const systemInstruction = `
You are an expert quiz generator. Your task is to create a JSON array representing a quiz on a specified topic with exactly 30 questions.

Each question must be an object with the following properties:
- "questionText": A string containing the quiz question.
- "options": An array of exactly 5 distinct strings, each a possible answer.
- "answer": A number (0-4) indicating the index of the correct option within the "options" array.
- "remark": A single-sentence string explaining why the correct option is correct.

The output must be valid JSON and must strictly adhere to the following schema. Do not include any additional text, commentary, or markdown formatting outside of the JSON array itself (e.g., no \`\`\`json ... \`\`\`). The output must start directly with '[' and end directly with ']'.

Example JSON output:
[
  {
    "questionText": "What is the capital of France?",
    "options": ["London", "Berlin", "Paris", "Madrid", "Rome"],
    "answer": 2,
    "remark": "Paris is the capital of France."
  },
  {
    //... 9 more questions following the same structure
  }
]
`;

const responseSchema: Schema = {
    type: SchemaType.ARRAY,
    items: { // Defines structure for each item in the array
        type: SchemaType.OBJECT,
        properties: {
            questionText: {
                type: SchemaType.STRING,
                description: "The Question of the quiz",
                nullable: false 
            },
            options: {
                type: SchemaType.ARRAY,
                items: {
                    type: SchemaType.STRING,
                    description: "Option of the quiz"
                },
                description: "An array of exactly 5 distinct string options.",
                nullable: false
            },
            answer: {
                type: SchemaType.NUMBER,
                description: "The 0-based index of the correct option in the 'options' array (0-4)." 
            },
            remark: {
                type: SchemaType.STRING,
                description: "A single-sentence explanation for the correct answer."
            }
        },
        required: ["questionText", "options", "answer", "remark"]  // All properties are required
    },
    description: "An array containing exactly 30 quiz question objects."
};


const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string;
if (!apiKey) {
    throw new Error("VITE_GEMINI_API_KEY environment variable not set!");
}
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    // *** Use a stable model ***
    model: "gemini-1.5-flash", // Or "gemini-1.0-pro"
    generationConfig: {
        responseMimeType: "application/json",
        responseSchema: responseSchema, 
    },
    systemInstruction: { // Pass systemInstruction as an object property
       role: "system", // Standard practice, though often inferred
       parts: [{ text: systemInstruction }]
    }
});


export async function generateContent(topic: string): Promise<string> {
    console.log(`Generating quiz for topic: ${topic}`);
    try {
       
        const result = await model.generateContent(topic);

      
        const response = result.response;
        const responseText = response.text(); // Get the text part, which should be JSON

        //* Try parsing to validate JSON before returning
        try {
            JSON.parse(responseText);
            return responseText;
        } catch (parseError) {
            console.error("Error parsing generated JSON:", parseError);
            console.error("Invalid JSON received:", responseText);
            // You might want to throw an error or return a default/error state
            throw new Error(`Failed to generate valid JSON. Raw output: ${responseText}`);
        }

    } catch (error) {
        console.error("Error generating content:", error);
        // Log the full error object if possible
        if (error instanceof Error) {
           console.error("Error details:", error.message, error.stack);
           // Inspect potential response embedded in the error if available
           // (Error structure varies, check SDK documentation or console output)
           // console.error("API Error Response (if available):", (error as any).response);
        }
         // Check for specific feedback (e.g., blocked content)
        // Note: Accessing result/response might not be possible if generateContent threw directly
        // Consider inspecting the error object itself for response details
        // console.error("Prompt Feedback (if available):", result?.response?.promptFeedback);

        throw new Error(`Failed to generate quiz content for topic "${topic}".`); // Re-throw or handle appropriately
    }
}