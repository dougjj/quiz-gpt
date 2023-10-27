import Link from 'next/link';

import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';

import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';

export function PrevNext({ topic, page, nextDisabled } : { topic: string, page: number, nextDisabled: boolean }) {
    return (
        <ButtonGroup spacing={2}
            sx={{ display: 'flex', justifyContent: 'space-between' }}
            color='primary'>
            <Button 
                disabled={page <= 1}
                startDecorator={<NavigateBeforeRoundedIcon />}
                component={Link}
                href={`/quiz/${topic}/${page - 1}`}
                >
                Prev
            </Button>
            <Button
                disabled={nextDisabled || page >= 10}
                endDecorator={<NavigateNextRoundedIcon />}
                component={Link}
                href={`/quiz/${topic}/${page + 1}`}
                >
                Next
            </Button>
        </ButtonGroup>
    )
};
