import { Configuration, OpenAIApi } from "openai";
import { config } from "./config.js";

const openai = new OpenAIApi(
  new Configuration({
    apiKey: config.openai.apiKey,
  }),
);

export async function getReply(prompt: string) {
  const response = await openai.createCompletion({
    model: "gpt-3.5-turbo",
    prompt,
    max_tokens: 200,
    stream: false,
  });
  return response;
}
