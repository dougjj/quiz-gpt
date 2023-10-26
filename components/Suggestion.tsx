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
    }, {
        topic: "Art",
        imageSrc: "/monalisa.jpg",
    },
]

export function Suggestions() {
    return (
        <>
        <Typography level="h2" gutterBottom>
                Explore
        </Typography>
        <Grid container
            justifyContent="center"
            >
            {suggestionData.map((value, i) =>
                <Grid key={i} sx={{ my: 1, mx: 1}}>
                    <Suggestion key={i} topic={value.topic} imageSrc={value.imageSrc} />
                </Grid>
            )}
        </Grid>
        </>
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
                width={200} height={160}/>
            </CardCover>
            <CardContent>
                <Typography
                    level="h4"
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