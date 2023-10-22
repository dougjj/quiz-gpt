import { Stack, Typography } from "@mui/joy"
import Search from '@/components/search'

export default async function Index() {
  return (
    <Stack>
    <Typography level="h1" className="title">Quizomatic!</Typography>
    <Typography>
      Quizomatic uses ChatGPT to generate questions and answers on any topic.
    </Typography>
    <Search />
    </Stack>
  )
}
