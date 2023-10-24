import Quiz from '@/components/quiz';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/types/supabase';

import NewQuestions from '@/components/new_questions';
import { Stack, Typography } from '@mui/joy';
import Search from '@/components/search';
import Link from 'next/link';

export default async function Page({ params }: { params: { topic: string, page: number } }) {
    const topic = params.topic;
    let page = Number(params?.page) || 1;
    page = Math.max(1, page);
    page = Math.min(10, page);
    
    const from = (page - 1) * 10;
    const to = page * 10 - 1;

    const supabase = createRouteHandlerClient<Database>({ cookies })
    const questions = await supabase.from('Question').select()
        .filter('topic', 'eq', topic)
        .range(from, to);

    if (questions.data?.length == 0) {
        return (
            <QuizPage>
                <NewQuestions key={topic} topic={topic} page={page}/>
            </QuizPage>
        )
    }

    const questionsString = questions.data?.map(q => [q.question, JSON.stringify(q.options), q.answer, q.explanation].join("\n")).join("\n\n");

    return (
        <QuizPage>
            <Quiz completion={questionsString || ""} 
                isLoading={false}
                topic={topic}
                page={page}/>
        </QuizPage>
    )
  }

function QuizPage({ children } : { children: React.ReactNode }) {
    return (
        <Stack spacing={2}>
            <Link href={"/"}>
                <Typography level="h4">Quizomatic</Typography>
            </Link>
            <Search />
            {children}
        </Stack>
    )
};
