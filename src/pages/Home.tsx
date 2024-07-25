import IsError from "@/components/IsError";
import IsPending from "@/components/IsPending";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Heading, Paragraph } from "@/components/ui/typography";
import { useFetch, usePagination } from "@/hooks";
import { env, quizCategories } from "@/lib/utils";
import {
  amountQuestionsAtom,
  answerAtom,
  modalConfirmationAtom,
  quizCategoryAtom,
  rightAnswerAtom,
} from "@/store";
import { QuestionProps } from "@/types";
import htmr from "htmr";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { ChangeEvent } from "react";

export default function Homepage() {
  const [quizCategory, setQuizCategory] = useAtom(quizCategoryAtom);
  const [answer, setAnswer] = useAtom(answerAtom);
  const [amountQuestions, setAmountQuestions] = useAtom(amountQuestionsAtom);

  const rightAnswer = useAtomValue(rightAnswerAtom);

  const { data, isPending, isError, isRefetching } = useFetch(
    `${env.API_URL}?amount=${amountQuestions}${
      quizCategory ? `&category=${quizCategory}` : ""
    }`
  );

  if (isPending || isRefetching) return <IsPending />;
  if (isError) return <IsError />;

  const questions = data.results as QuestionProps[];

  function onChangeCategory(e: ChangeEvent<HTMLSelectElement>) {
    setQuizCategory(Number(e.target.value));
  }

  return (
    <>
      <section className="w-full flex flex-col justify-center max-w-7xl items-center">
        <QuestionsList questions={questions} />
        <select value={quizCategory} onChange={onChangeCategory}>
          <option>Select Category</option>
          {quizCategories.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <div className="flex justify-center items-center w-fit">
          <Button>Previous</Button>
          <Paragraph>1/10</Paragraph>
          <Button>Next</Button>
        </div>
      </section>
      {rightAnswer === answer ? <p>Benar!</p> : <p>Wrong!</p>}
    </>
  );
}

function QuestionsList({ questions }: { questions: QuestionProps[] }) {
  const [answer, setAnswer] = useAtom(answerAtom);
  const [rightAnswer, setRightAnswer] = useAtom(rightAnswerAtom);
  const setModalConfirmation = useSetAtom(modalConfirmationAtom);

  const { currentData, setCurrentPage, currentPage } = usePagination(questions);

  return (
    <>
      <div className="flex justify-center w-full items-center flex-col">
        <Heading as="h2">Quizkuy</Heading>
        <div className="flex flex-col justify-center items-center">
          {currentData.map((item) => {
            const answerOptions = [
              item.correct_answer,
              ...item.incorrect_answers,
            ].sort();
            return (
              <>
                <Card>
                  <CardHeader>
                    <div className="rounded-sm bg-yellow-200 px-2 py-0.5 font-bold w-fit">
                      <Paragraph>{item.type}</Paragraph>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Paragraph className="font-semibold">
                      {htmr(item.question)}
                    </Paragraph>
                    <div className="flex justify-center items-center space-x-4">
                      {answerOptions.map((answer) => (
                        <Button
                          variant="secondary"
                          onClick={() => {
                            setAnswer(answer);
                          }}
                        >
                          {answer}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            );
          })}
        </div>
      </div>
      <Paragraph>
        {currentPage}/{questions.length}
      </Paragraph>
      {currentPage > 1 ? (
        <Button onClick={() => setCurrentPage((prev) => prev - 1)}>
          Previous
        </Button>
      ) : null}
      <Button onClick={() => setCurrentPage((prev) => prev + 1)}>Next</Button>
    </>
  );
}
