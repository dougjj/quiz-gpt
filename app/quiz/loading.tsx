import Search from '@/components/search';
import Link from 'next/link';

import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <Stack spacing={2}>
            <Link href={"/"}>
                <Typography level="h4">Quizomatic</Typography>
            </Link>
            <Search />
        </Stack>
    )
  }