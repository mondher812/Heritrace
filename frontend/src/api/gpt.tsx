import OpenAI from "openai";

// Instantiate the OpenAI client with your API key from Vite
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API,
  dangerouslyAllowBrowser: true,
});

// Function to check if a string is valid JSON
const isValidJson = (text: string): boolean => {
  try {
    JSON.parse(text);
    return true;
  } catch (e) {
    return false;
  }
};

export const fetchGptResponse = async (name: string, continent?: string): Promise<Record<string, string>> => {
    let attempts = 0;
    const maxRetries = 3;

    while (attempts < maxRetries) {
      try {
        const prompt = continent
          ? `Provide details for the name '${name}' specifically in the context of ${continent}. 
             Only select a single country from ${continent} and provide information accordingly.
             Respond in **pure JSON format**:
             {
               "country": "...",
               "meaning": "...",
               "food": "...",
               "clothes": "...",
               "language": "...",
               "summary": "..."
             }`
          : `Provide details for the name '${name}' based on its most historically recognized country of origin.
             Only select **one** country and provide information accordingly.
             Do NOT include multiple country origins.
             Respond in **pure JSON format**:
             {
               "country": "...",
               "meaning": "...",
               "food": "...",
               "clothes": "...",
               "language": "...",
               "summary": "..."
             }`;

        const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You must respond with valid JSON only and focus on one country." },
            { role: "user", content: prompt },
          ],
        });

        let responseText = completion.choices[0].message.content ?? "{}";

        // Validate JSON before returning
        if (isValidJson(responseText)) {
          return JSON.parse(responseText);
        } else {
          console.warn(`Invalid JSON received. Retrying attempt ${attempts + 1}...`);
        }
      } catch (error) {
        console.error(`Error fetching GPT response on attempt ${attempts + 1}:`, error);
      }

      attempts++;
    }

    console.error("Max retries reached. Returning fallback data.");

    return {
      country: "Unknown",
      meaning: "No information available.",
      food: "No data available.",
      clothes: "No data available.",
      language: "No data available.",
      summary: "Unable to fetch details for this name.",
    };
};
