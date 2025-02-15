// gpt.ts (or gptService.ts)
import OpenAI from "openai";

// Instantiate the OpenAI client with your API key from Vite
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API, dangerouslyAllowBrowser: true
});

export const fetchGptResponse = async (name: string): Promise<string> => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Using the model from the official documentation example
      messages: [
        { role: "developer", content: "You are a helpful assistant." },
        { role: "user", content: `What country does the name ${name} come from?` },
      ],
      store: true,
    });
    
    // Log or return the assistant's reply
    console.log(completion.choices[0].message.content);
    return completion.choices[0].message.content ?? "No response from GPT";
  } catch (error) {
    console.error("Error fetching GPT message from OpenAI: ", error);
    throw error;
  }
};