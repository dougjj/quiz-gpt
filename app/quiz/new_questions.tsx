'use client'

import Quiz from '@/components/quiz';
import { useCompletion } from 'ai/react';
import { useEffect } from 'react';

export default function NewQuestions({topic, page}: {topic: string, page: number}) {

  const { completion, complete, setCompletion, stop, isLoading } = useCompletion(
    {api: `/api/completion?query=${topic}`}
  );
  
  // call api/completeion api on page load
  useEffect(() => {
    complete("");
    console.log("complete called");
  }, [complete]);

  console.log(completion)

  return (
    <>
    <p>Client side</p>
    <Quiz completion={completion} isLoading={isLoading}
        topic={topic} page={page}/>
    </>
  );
}
