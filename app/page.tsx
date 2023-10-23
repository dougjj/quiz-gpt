import { Stack, Typography } from "@mui/joy"
import Search from '@/components/search'
import Suggestion from "@/components/Suggestion"

export default async function Index() {
  return (
    <Stack spacing={2}>
    <Typography level="h1" className="title">Quizomatic!</Typography>
    <Typography>
      Quizomatic uses ChatGPT to generate questions and answers on any topic.
    </Typography>
    <Search />
    <Suggestion />
    </Stack>
  )
}
