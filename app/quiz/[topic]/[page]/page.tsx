import Quiz from '@/components/quiz';
import NewQuestions from '@/components/new_questions';
import Search from '@/components/search';
import Link from 'next/link';

import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

import { PrevNext } from '@/components/nav';
import { getCachedQuestions } from '@/utils/data';
import { revalidatePath } from 'next/cache';

export default async function Page({ params }: { params: { topic: string, page: number } }) {
    const topic = decodeURIComponent(params.topic);
    let page = Number(params?.page) || 1;
    const questions = await getCachedQuestions(topic, page);

    console.log("topic, page: ", topic, page)
    console.log("page q length: ", questions.data?.length)

    if (questions.data?.length == 0) {
        revalidatePath(`/quiz/${topic}/${page}`);
        return (
            <QuizPage topic={topic} page={page} nextDisabled={true}>
                <NewQuestions key={topic} topic={topic} page={page}/>
            </QuizPage>
        )
    }

    const questionsString = questions.data?.map(q => [q.question, JSON.stringify(q.options), q.answer, q.explanation].join("\n")).join("\n\n");

    return (
        <QuizPage topic={topic} page={page} nextDisabled={false}>
            <Quiz completion={questionsString || ""} 
                isLoading={false}
                topic={topic}
                page={page}/>
        </QuizPage>
    )
  }

function QuizPage({ topic, page, nextDisabled, children } : { topic: string, page: number, nextDisabled: boolean, children: React.ReactNode }) {
    return (
        <Stack spacing={2}>
            <Link href={"/"}>
                <Typography level="h4">Quizomatic</Typography>
            </Link>
            <Search />
            {children}
            <PrevNext topic={topic} page={page} nextDisabled={nextDisabled} />
        </Stack>
    )
};
