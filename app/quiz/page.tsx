import Quiz from '@/components/quiz';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/types/supabase';

import NewQuestions from './new_questions';


export default async function Page({
    searchParams,
  }: {
    searchParams: { [key: string]: string | string[] | undefined }
  }) {
    const topic = searchParams.q as string;

    let page: number;  // Declare page outside of the if-else scope

    if (searchParams.page === undefined) {
        page = 1;
    } else {
        const rawPage = searchParams.page as string;
        page = parseInt(rawPage, 10);  // Always provide a radix to parseInt
    }
    page = Math.max(1, page);
    page = Math.min(10, page);
    
    const from = (page - 1) * 10;
    const to = page * 10 - 1;

    const supabase = createRouteHandlerClient<Database>({ cookies })
    const questions = await supabase.from('Question').select()
        .filter('topic', 'eq', topic)
        .range(from, to);

    if (questions.data?.length == 0) {
        return <NewQuestions topic={topic} page={page} />
    }

    const questionStrings = questions.data?.map(q => [q.question, JSON.stringify(q.options), q.answer, q.explanation].join("\n")).join("\n\n");

    return <Quiz completion={questionStrings || ""} isLoading={false}
                topic={topic} page={page}/>
  }