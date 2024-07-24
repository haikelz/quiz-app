import IsError from "@/components/IsError";
import IsPending from "@/components/IsPending";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Heading, Paragraph } from "@/components/ui/typography";
import { useFetch, usePagination } from "@/hooks";
import { env, quizCategories } from "@/lib/utils";
import {
  answerAtom,
  modalConfirmationAtom,
  quizCategoryAtom,
  rightAnswerAtom,
} from "@/store";
import { QuestionProps } from "@/types";
import htmr from "htmr";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { ChangeEvent } from "react";
import { useForm } from "react-hook-form";

export default function Homepage() {
  const [quizCategory, setQuizCategory] = useAtom(quizCategoryAtom);
  const modalConfirmation = useAtomValue(modalConfirmationAtom);

  const { data, isPending, isError, isRefetching } = useFetch(
    `${env.API_URL}?amount=20${quizCategory ? `&category=${quizCategory}` : ""}`
  );

  if (isPending || isRefetching) return <IsPending />;
  if (isError) return <IsError />;

  const questions = data.results as QuestionProps[];

  function onChangeCategory(e: ChangeEvent<HTMLSelectElement>) {
    setQuizCategory(Number(e.target.value));
  }

  return (
    <>
      <QuestionsList questions={questions} />
      <section className="w-full flex justify-center items-center">
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
      {modalConfirmation ? <ModalConfirmation /> : null}
    </>
  );
}

function QuestionsList({ questions }: { questions: QuestionProps[] }) {
  const [answer, setAnswer] = useAtom(answerAtom);
  const [rightAnswer, setRightAnswer] = useAtom(rightAnswerAtom);
  const setModalConfirmation = useSetAtom(modalConfirmationAtom);

  const { currentData, currentPage, pageNumbers, setCurrentPage } =
    usePagination(questions);

  return (
    <section className="flex justify-center w-full items-center max-w-7xl flex-col">
      <Heading as="h2">Quizkuy</Heading>
      <div className="grid grid-cols-3 w-full gap-6 grid-rows-1">
        {currentData.map((item) => {
          const answerOptions = [
            item.correct_answer,
            ...item.incorrect_answers,
          ];
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
                </CardContent>
              </Card>
              <div className="flex justify-center items-center space-x-4">
                {answerOptions.map((answer) => (
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setAnswer(answer);
                      setRightAnswer(
                        answer === item.correct_answer ? answer : ""
                      );
                      setModalConfirmation(true);
                    }}
                  >
                    {answer}
                  </Button>
                ))}
              </div>
            </>
          );
        })}
      </div>
    </section>
  );
}

function ModalConfirmation() {
  const [answer, setAnswer] = useAtom(answerAtom);
  const [rightAnswer, setRightAnswer] = useAtom(rightAnswerAtom);
  const [modalConfirmation, setModalConfirmation] = useAtom(
    modalConfirmationAtom
  );

  const { getValues, handleSubmit, setValue } = useForm({
    defaultValues: {
      answer: "",
    },
  });

  function onSubmit() {
    setValue("answer", answer);
  }

  return (
    <div className="blur-sm flex fixed justify-center items-center min-h-svh w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-20 flex justify-center items-center flex-col bg-white"
      >
        <Button onClick={() => setModalConfirmation(false)}>No</Button>
        <Button
          onClick={() => {
            setModalConfirmation(false);
          }}
          type="submit"
        >
          Yes
        </Button>
      </form>
    </div>
  );
}
