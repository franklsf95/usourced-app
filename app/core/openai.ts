import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";
import { config } from "./config.js";

const configuration = new Configuration({
  apiKey: config.openai.apiKey,
});
delete configuration.baseOptions.headers["User-Agent"];

const openai = new OpenAIApi(configuration);

export async function chat(messages: ChatCompletionRequestMessage[]) {
  return await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages,
    max_tokens: 100,
    temperature: 0.5,
    stream: false,
  });
}
