import supabase from "./supabase";
import { parseQuestions } from "./parsing";

export const QUESTIONS_PER_PAGE = 8;

export async function getCachedQuestions(topic: string, page: number) {
    page = Math.max(1, page);
    page = Math.min(10, page);
    
    const from = (page - 1) * QUESTIONS_PER_PAGE;
    const to = page * QUESTIONS_PER_PAGE - 1;
  
    console.time("supabase")
    const questions = await supabase.from('Question').select()
        .filter('topic', 'eq', topic)
        .range(from, to);
    console.timeEnd("supabase")

    const isFullPage = questions.data?.length === QUESTIONS_PER_PAGE;

    return { questions, isFullPage };
  }
  
export async function saveQuestions(topic: string, completion: string) {
    const questions = parseQuestions(completion);
    const questionsWithTopic = questions.map(question => ({ topic, ...question }));
  
    console.log("Questions", questionsWithTopic);
    
    const {error} = await supabase.from('Question').insert(questionsWithTopic)
  }
  