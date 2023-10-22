'use client';

import { useRouter } from 'next/navigation';
import Input from '@mui/joy/Input';

export default function Search() {
  const router = useRouter();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const topic = formData.get("topic");
    if (topic != null && topic != "") {
      router.push(`/quiz?q=${topic}`);
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-max-[550px] relative w-full lg:w-80 xl:w-full">
      <Input
        name="topic"
        placeholder="Get quizzed on anything"
        defaultValue={''}
      />
    </form>
  );
}