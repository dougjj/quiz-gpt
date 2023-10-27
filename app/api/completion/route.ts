import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextRequest } from 'next/server'

import supabase from '@/utils/supabase';
import { getCachedQuestions, saveQuestions, QUESTIONS_PER_PAGE } from '@/utils/data';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getOpenAIResponse(prompt: string, existingQuestions: string) {
    console.log("prompt:", prompt)
    
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
${existingQuestions}

Generate ${QUESTIONS_PER_PAGE} questions about ${prompt} which are different from those above.`},
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
  const { topic, page } = await req.json();
  console.log("page", page, topic)

  const { questions, isFullPage } = await getCachedQuestions(topic, page);
  if (isFullPage) {
    const questionsString = questions.data?.map(q => [q.question, JSON.stringify(q.options), q.answer, q.explanation].join("\n")).join("\n\n");
    return new Response(questionsString)
  }

  const questionsText = await supabase.from('Question').select('question').filter('topic', 'eq', topic);
  const existingQuestions = questionsText.data?.join("\n") || "";

  revalidatePath(`/quiz/${topic}/${page}`);
  
  const stream = await getOpenAIResponse(topic, existingQuestions);
  return new StreamingTextResponse(stream);
}
