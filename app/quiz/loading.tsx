import Search from '@/components/search';
import Link from 'next/link';

import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="stretch"
            spacing={2}
            sx={{ width: '100%', mx: 'auto' }}
        >
            <Link href={"/"}>
                <Typography level="h4">Quizomatic</Typography>
            </Link>
            <Search />
        </Stack>
    )
  }