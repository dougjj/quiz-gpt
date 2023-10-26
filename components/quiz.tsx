'use client'

// TODO Prevent click between buttons
// TODO Show correct answer
// TODO Say if right or wrong
// TODO Tone
// TODO Keep colours, no grey out

import { useState } from 'react';
import * as React from 'react';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import Card from '@mui/joy/Card';
import CircularProgress from '@mui/joy/CircularProgress';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

interface AnswerButtonProps {
    text: string,
    reveal: boolean,
    is_correct: boolean,
    onClick: () => void,
}

function AnswerButton({text, reveal, is_correct, onClick}: AnswerButtonProps) {
    const [clicked, setClicked] = useState(false);
    return (<Button
        onClick={() => {setClicked(true); onClick()}}
        sx={[
            is_correct && {
            '&:disabled': {bgcolor: (theme) => theme.palette.success.softBg},
            },
            !is_correct && clicked && {
            '&:disabled': {bgcolor: (theme) => theme.palette.danger.softBg},
            }
        ]}
        disabled={reveal}>
            {text}
        </Button>)
};

interface QuestionProps {
    question: string;
    options: string[];
    correct_answer: string;
    explanation: string;
    onAnswer: () => void,
    onCorrect: () => void,
}

export function Question({question, options, correct_answer, explanation, onAnswer, onCorrect}: QuestionProps) {
  const [reveal, setReveal] = useState(false);
  const [correct, setCorrect] = useState(false);

  function onClick(is_correct: boolean) {
    setReveal(true);
    onAnswer();
    if (is_correct) {
        setCorrect(true);
        onCorrect();
    }
  };

  const answerButtons = options.map((value, i) =>
    <AnswerButton 
        key={i} 
        text={value}
        reveal={reveal} 
        is_correct={value === correct_answer}
        onClick={() => onClick(value === correct_answer)}
    />);

  return (
    <Card>
    <Stack spacing={1}>
        <Typography level="h4">
            {question}
        </Typography>
        <ButtonGroup spacing="0.5rem" 
            orientation="vertical" 
            aria-label="spacing button group"
            color='primary'>
            {answerButtons}
        </ButtonGroup>
        <>
        {reveal && correct && <Typography color='success' level="title-lg"> <CheckCircleRoundedIcon /> Nice Job!</Typography>}
        {reveal && !correct && <Typography color='danger' level="title-lg"><CancelRoundedIcon /> Oops 🙈</Typography>}
        {reveal &&
        <Typography level="body-lg">
            {explanation}
        </Typography>}
        </>
    </Stack>
    </Card>
    );
}

function parse_question(question: string, onAnswer: () => void, onCorrect: () => void): QuestionProps {
    const [question_text, options, correct_answer, explanation] = question.split("\n");
    return {
      question: question_text,
      options: JSON.parse(options),
      correct_answer: correct_answer,
      explanation: explanation,
      onAnswer: onAnswer,
      onCorrect: onCorrect,
  }
}

function parse_completion(completion: string, onAnswer: () => void, onCorrect: () => void): QuestionProps[] {
  const question_list = completion.split("\n\n").map((question) => {
    try {
      return parse_question(question, onAnswer, onCorrect);
    } catch (error) {
      return null
    }
  })
  return question_list.flatMap(f => !!f ? [f] : [])
}

interface QuizProps {
    completion: string;
    isLoading: boolean;
    topic: string;
    page: number;
}

export default function Quiz({completion, isLoading, topic, page}: QuizProps) {
    const [answered, setAnswered] = useState(0); 
    const [correct, setCorrect] = useState(0);
    function incrementAnswered() {
        setAnswered(answered + 1);
    }
    function incrementCorrect() {
        setCorrect(correct + 1);
    }
  const question_list = parse_completion(completion, incrementAnswered, incrementCorrect);
  const num_loaded = question_list.length;
  const is_finished = !isLoading && (num_loaded === answered) && (answered > 0);
  const next_url = `/quiz/${topic}/${page + 1}`
 
  return (
    <Stack spacing={4}>
        {question_list.map((question, i) =>
        <Question key={i} {...question} />)}
        {isLoading && <CircularProgress variant="outlined"/>}
        {is_finished && 
        <Card>
            <Typography level="h2">Final score: {correct}/{num_loaded}</Typography>
            <Button component="a" href={next_url}>
              Generate more questions!
            </Button>
        </Card>}
    </Stack>
  );
}
