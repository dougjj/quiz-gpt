'use client'

import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import { CardContent, CardCover } from '@mui/joy';
import Image from 'next/image';
import Link from 'next/link';

export default function Suggestion() {
    return (
        <Card sx={{ width: 200, height: 160 }} >
            <CardCover>
                <Image src="/shakespeare.jpg" alt="Shakespeare" 
                width={500} height={500}/>
            </CardCover>
            <CardContent>
                <Link href="quiz/?q=shakespeare">
                    <Typography>
                        Shakespeare
                    </Typography>
                </Link>
            </CardContent>
        </Card>
    )
}