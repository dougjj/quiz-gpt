'use client'

import Quiz from '@/components/quiz';
import { useCompletion } from 'ai/react';
import { useEffect } from 'react';

export default function NewQuestions({topic, page}: {topic: string, page: number}) {

  const { completion, complete, isLoading } = useCompletion(
    {api: `/api/completion?query=${topic}`}
  );
  
  // call api/completeion api on page load
  useEffect(() => {
    complete("")
  }, [topic]);
 
  return (
    <Quiz completion={completion} isLoading={isLoading}
        topic={topic} page={page}/>
  );
}
