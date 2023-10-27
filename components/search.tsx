'use client';

import { useRouter } from 'next/navigation';
import Input from '@mui/joy/Input';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

export default function Search() {
  const router = useRouter();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const topic = formData.get("topic");
    if (topic != null && topic != "") {
      router.push(`/quiz/${topic}/1`);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <Input
        name="topic"
        placeholder="Get quizzed on anything"
        defaultValue={''}
        fullWidth
        endDecorator={<SearchRoundedIcon />}
      />
    </form>
  );
}