function parseQuestion(question: string) {
    const [question_text, options, correct_answer, explanation] = question.split("\n");
    if (explanation === undefined) {
        throw new Error(`Invalid question: question=${question}}`);
    }
    return {
      question: question_text,
      options: JSON.parse(options),
      answer: correct_answer,
      explanation: explanation,
  }
}    

export function parseQuestions(completion: string) {
  const question_list = completion.split("\n\n").map((question) => {
    try {
      return parseQuestion(question);
    } catch (error) {
      console.log(error);
      return null
    }
  })
  return question_list.flatMap(f => !!f ? [f] : [])
}
