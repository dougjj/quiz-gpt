import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextRequest } from 'next/server'

import supabase from '@/utils/supabase';
import { parse_many_questions } from '@/utils/parsing';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getOpenAIResponse(prompt: string, existing_questions: string) {
    console.log("prompt:", prompt)
    // console.log("existing_questions:", existing_questions)
    
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

Generate 10 questions about ${prompt} which are different from those above.`},
          ],
        stream: true,
        max_tokens: 10_000,
      });
  
    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response, {
      async onCompletion(completion) {
        console.log("completion:", completion);
        await saveQuestions(prompt, completion);
      },
    });

    return stream
}
 
export async function POST(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const prompt = searchParams.get('query') || "nothing"

  const questions = await supabase.from('Question').select().filter('topic', 'eq', prompt);
  const existing_questions = questions.data?.map(q => q.question).join("\n") || "";

  const stream = await getOpenAIResponse(prompt, existing_questions);
  return new StreamingTextResponse(stream);
}

async function saveQuestions(topic: string, completion: string) {
  const questions = parse_many_questions(completion);
  const questionsWithTopic = questions.map(question => ({ topic, ...question }));

  console.log("Questions", questionsWithTopic);
  
  const {error} = await supabase.from('Question').insert(questionsWithTopic)
}
