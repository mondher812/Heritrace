import { HfInference } from "@huggingface/inference";
import dotenv from "dotenv";

dotenv.config({ path: './openai/.env' });

const client = new HfInference(process.env.HUGGING_FACE);

const chatCompletion = await client.chatCompletion({
	model: "meta-llama/Llama-3.3-70B-Instruct",
	messages: [
		{
			role: "user",
			content: "What country does the name Jenna Nabih come from?"
		}
	],
	provider: "together",
	max_tokens: 500,
});

console.log(chatCompletion.choices[0].message);
