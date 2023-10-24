import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import { CardContent, CardCover, Grid, Stack } from '@mui/joy';
import Image from 'next/image';
import NextLink from 'next/link';
import Link from '@mui/joy/Link';

const suggestionData: SuggestionProps[] = [
    {
        topic: "Shakespeare",
        imageSrc: "/shakespeare.jpg",
    }, {
        topic: "French History",
        imageSrc: "/napoleon.jpg",
    }, {
        topic: "Art",
        imageSrc: "/monalisa.jpg",
    }, {
        topic: "Space",
        imageSrc: "/space.jpg",
    }, {
        topic: "Sweden",
        imageSrc: "/sweden.png",
    }
]

export function Suggestions() {
    return (
        <Stack spacing={2}>
            <Typography level="h2">
                Explore
            </Typography>
            {suggestionData.map((value, i) =>
                <Suggestion key={i} topic={value.topic} imageSrc={value.imageSrc} />
            )}
        </Stack>
    )
}

interface SuggestionProps {
    topic: string,
    imageSrc: string,
}

export function Suggestion({ topic, imageSrc } : SuggestionProps) {
    const t = topic.toLowerCase();
    return (
        <Card sx={{ width: 200, height: 160 }} >
            <CardCover>
                <Image src={imageSrc} alt={topic} 
                width={500} height={500}/>
            </CardCover>
            <CardContent>
                <Typography
                    level="body-lg"
                    fontWeight="lg"
                    textColor="#fff">
                    <Link href={`/quiz/${t}/1`} component={NextLink}  overlay
                        underline="none"
                        sx={{ color: 'white'}}>
                        {topic}
                    </Link>
                </Typography>
            </CardContent>
        </Card>
    )
}