import { Stack, Typography, Container, Box, Input} from "@mui/joy"
import Search from '@/components/search'
import { Suggestions } from "@/components/Suggestion"

export default async function Index() {
  return (
    <Container>
    <Box>
        <Typography level="h1" gutterBottom>
            Quizomatic
        </Typography>
        <Typography>
          Quizomatic uses ChatGPT to generate questions and answers on any topic.
        </Typography>
    </Box>

    <Box sx={{ my: 3 }}>
      <Search />
    </Box>
    <Box sx={{ my: 3 }}>
      <Suggestions />
    </Box>
    </Container>
  )
}
