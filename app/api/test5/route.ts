import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextRequest } from 'next/server' 


import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/types/supabase';
import { parse_many_questions } from '@/utils/parsing';

export const dynamic = 'force-dynamic';

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
 
// Set the runtime to edge for best performance
export const runtime = 'edge';

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
    const [stream1, stream2] = stream.tee();
    saveQuestions(prompt, stream2);
    return stream1
}
 
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const prompt = searchParams.get('query') || "nothing"

  // const supabase = createRouteHandlerClient<Database>({ cookies })
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

  const questions = await supabase.from('Question').select().filter('topic', 'eq', prompt);
  const existing_questions = questions.data?.map(q => q.question).join("\n") || "";

  const stream = await getOpenAIResponse(prompt, existing_questions);
  return new StreamingTextResponse(stream);
}

async function saveQuestions(topic: string, stream: ReadableStream) {
  const streamingTextResponse = new StreamingTextResponse(stream)
  const text = await streamingTextResponse.text();
  const questions = parse_many_questions(text);
  const questionsWithTopic = questions.map(question => ({ topic, ...question }));

  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

  await supabase.from('Question').insert(questionsWithTopic)
}
