'use client'

import { useSearchParams } from 'next/navigation'
import Quiz from '@/components/quiz';
import { useCompletion } from 'ai/react';
import { useEffect } from 'react';

export default function Page() {
  const searchParams = useSearchParams();
  const topic = searchParams.get('q') || "";

  const { completion, complete, isLoading } = useCompletion(
    {api: `/api/completion?query=${topic}`}
  );
  
  // call api/completeion api on page load
  useEffect(() => {
    complete("")
  }, [topic]);

  console.log(completion)
 
  return (
    <Quiz completion={completion} isLoading={isLoading}
      topic={topic} page={1}/>
  );
}
