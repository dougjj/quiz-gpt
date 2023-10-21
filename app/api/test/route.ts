import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextRequest } from 'next/server' 

// export const dynamic = 'force-dynamic';

// Set the runtime to edge for best performance
export const runtime = 'edge';

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  

async function getOpenAIResponse(prompt: string, existing_questions: string) {
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-16k",
        messages: [
            {
              "role": "system",
              "content": "You are a helpful assistant."
            },
            {
              "role": "user",
              "content": `Provide a list of questions, each separated by 2 lines. Each question should be in the format: Question, Options, Answer, Explanation. Each element should be on its own line.

Please generate quiz questions in the following format:            

What is the capital of France?
["Paris", "London", "Berlin", "Madrid"]
Paris
Paris is the capital city of France and is known for its rich history and iconic landmarks.

Which river runs through Egypt?
["Amazon", "Nile", "Mississippi", "Yangtze"]
Nile
The Nile is a major river in northeastern Africa and flows through Egypt, providing essential water resources.


Do not include any of the following questions:
${existing_questions}

Generate 3 questions about ${prompt} which are different from those above.`},
          ],
        stream: true,
        temperature: 1,
        max_tokens: 10_000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,    
      });
  
    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);
    return stream
}
 
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const prompt = searchParams.get('query') || "nothing"
  const existing_questions = "";

  const stream = await getOpenAIResponse(prompt, existing_questions);
  return new StreamingTextResponse(stream);
}