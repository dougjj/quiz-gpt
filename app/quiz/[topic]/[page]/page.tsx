import Quiz from '@/components/quiz';
import NewQuestions from '@/components/new_questions';
import Search from '@/components/search';
import Link from 'next/link';

import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';

import supabase from '@/utils/supabase';


// export const dynamic = 'force-dynamic';

export default async function Page({ params }: { params: { topic: string, page: number } }) {
    const topic = decodeURIComponent(params.topic);
    let page = Number(params?.page) || 1;
    page = Math.max(1, page);
    page = Math.min(10, page);
    
    const from = (page - 1) * 10;
    const to = page * 10 - 1;

    console.time("supabase")
    const [questions, count] = await Promise.all([supabase.from('Question').select()
        .filter('topic', 'eq', topic)
        .range(from, to),
        supabase.from('Question').select('id', {count : 'exact'})
        .filter('topic', 'eq', topic),])
    console.timeEnd("supabase")

    const numPages = Math.ceil((count.count || 0) /10);

    console.log("topic, page: ", topic, page)
    console.log("page q length: ", questions.data?.length)

    if (questions.data?.length == 0) {
        return (
            <QuizPage topic={topic} numPages={numPages}>
                <NewQuestions key={topic} topic={topic} page={page}/>
            </QuizPage>
        )
    }

    const questionsString = questions.data?.map(q => [q.question, JSON.stringify(q.options), q.answer, q.explanation].join("\n")).join("\n\n");

    return (
        <QuizPage topic={topic} numPages={numPages}>
            <Quiz completion={questionsString || ""} 
                isLoading={false}
                topic={topic}
                page={page}/>
        </QuizPage>
    )
  }

function QuizPage({ topic, numPages, children } : { topic: string, numPages: number, children: React.ReactNode }) {
    return (
        <Stack spacing={numPages}>
            <Link href={"/"}>
                <Typography level="h4">Quizomatic</Typography>
            </Link>
            <Search />
            {children}
            <PageSelector topic={topic} numPages={numPages} />
        </Stack>
    )
};

function PageSelector({ topic, numPages } : { topic: string, numPages: number}) {
    const nPages = Math.min(10, numPages);
    return (
        <ButtonGroup spacing={1}>
            {Array.from(Array(nPages).keys()).map((i) =>(
                <PageSelectorButton key={i} topic={topic} page={i+1}/>
            )
            )}
        </ButtonGroup>
    )
};

function PageSelectorButton({ topic, page } : { topic: string, page: number}) {
    return (
        <Button 
            component={Link}
            href={`/quiz/${topic}/${page}`}>
            <Typography level="body-sm">
                {page}    
            </Typography>
        </Button>
    )
};

export async function generateStaticParams() {  
    return ["shakespeare", "sweden", "art"].map((topic) => ({
      topic: topic,
      page: "1",
    }))
  }