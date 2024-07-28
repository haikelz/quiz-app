import IsError from "@/components/IsError";
import IsPending from "@/components/IsPending";
import TotalAnsweredQuestions from "@/components/TotalAnsweredQuestions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Paragraph } from "@/components/ui/typography";
import { useFetch, usePagination, useTitle } from "@/hooks";
import { cn, env } from "@/lib/utils";
import {
  answerAtom,
  isBackToPreviousQuestionAtom,
  isNextQuestionAtom,
  isRunningAtom,
  modalConfirmationSubmitAtom,
  modalPreferencesAtom,
  modalResultAtom,
  selectAnswerAtom,
} from "@/store";
import { QuestionProps } from "@/types";
import htmr from "htmr";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const ModalResult = lazy(() => import("@/components/ModalResult"));
const ModalConfirmationSubmit = lazy(
  () => import("@/components/ModalConfirmationSubmit")
);
const ModalNotAvailableData = lazy(
  () => import("@/components/ModalNotAvailableData")
);
const Timer = lazy(() => import("@/components/Timer"));
const ModalTimeout = lazy(() => import("@/components/ModalTimeout"));

const { API_URL } = env;

export default function Quiz() {
  const modalPreferences = useAtomValue(modalPreferencesAtom);
  const isRunning = useAtomValue(isRunningAtom);

  const modalConfirmationSubmit = useAtomValue(modalConfirmationSubmitAtom);
  const modalResult = useAtomValue(modalResultAtom);

  useTitle("Kerjakan soal kuis");

  const { data, isPending, isError, isRefetching } = useFetch(
    `${API_URL}?amount=10${
      modalPreferences.category ? `&category=${modalPreferences.category}` : ""
    }${
      modalPreferences.type !== "random" && modalPreferences.type
        ? `&type=${modalPreferences.type}`
        : ""
    }${
      modalPreferences.difficulity
        ? `&difficulity=${modalPreferences.difficulity}`
        : ""
    }`
  );

  if (isPending || isRefetching) return <IsPending />;
  if (isError) return <IsError />;

  const questions = (data.results as QuestionProps[]).map((item, index) => ({
    ...item,
    id: index + 1,
  }));

  return (
    <>
      {questions.length ? (
        modalPreferences.isOpenModal ? (
          <section className="w-full flex flex-col justify-center max-w-4xl min-h-svh items-center">
            <Suspense>
              <Timer />
            </Suspense>
            <QuestionsList questions={questions} />
            {modalConfirmationSubmit ? (
              <Suspense>
                <ModalConfirmationSubmit />
              </Suspense>
            ) : null}
            {modalResult ? (
              <Suspense>
                <ModalResult />
              </Suspense>
            ) : null}
          </section>
        ) : (
          <Navigate to="/" />
        )
      ) : (
        <Suspense>
          <ModalNotAvailableData />
        </Suspense>
      )}
      {!isRunning ? (
        <Suspense>
          <ModalTimeout />
        </Suspense>
      ) : null}
    </>
  );
}

function QuestionsList({ questions }: { questions: QuestionProps[] }) {
  const [answer, setAnswer] = useAtom(answerAtom);
  const [selectAnswer, setSelectAnswer] = useAtom(selectAnswerAtom);
  const [isBackToPreviousQuestion, setIsBackToPreviousQuestion] = useAtom(
    isBackToPreviousQuestionAtom
  );
  const [isNextQuestion, setIsNextQuestion] = useAtom(isNextQuestionAtom);

  const setModalConfirmationSubmit = useSetAtom(modalConfirmationSubmitAtom);

  const { currentData, setCurrentPage, currentPage } = usePagination(questions);

  return (
    <>
      <div className="flex w-fit space-y-3 flex-col fixed right-4 justify-center items-center">
        {questions.map((item) => (
          <Button
            key={item.id}
            variant="outline"
            className={cn(
              "w-10 h-10 rounded-full flex justify-center items-center",
              item.id === currentPage ? "bg-gray-200" : ""
            )}
          >
            {item.id}
          </Button>
        ))}
      </div>
      <div className="flex justify-center w-full items-center flex-col">
        <div className="flex flex-col justify-center items-center w-full">
          {currentData.map((item) => {
            // Merge correct answer and incorrect answers to one array
            const answerOptions = [
              item.correct_answer,
              ...item.incorrect_answers,
            ].sort();
            return (
              <Card key={item.id} className="w-full">
                <CardHeader className="flex justify-between w-full items-center flex-row">
                  <div className="rounded-sm bg-yellow-200 px-2 py-0.5 font-bold w-fit">
                    <Paragraph>{item.type}</Paragraph>
                  </div>
                  <div
                    className={cn(
                      "w-fit flex mt-4 items-center space-x-3",
                      currentPage <= 1
                        ? "justify-end"
                        : currentPage >= 10
                        ? "justify-start"
                        : ""
                    )}
                  >
                    {currentPage > 1 ? (
                      <Button
                        onClick={() => {
                          setCurrentPage((prev) => prev - 1);
                          setIsBackToPreviousQuestion(true);

                          selectAnswer !== "" && !isNextQuestion
                            ? setAnswer((prev) =>
                                prev.map((data) => ({
                                  ...data,
                                  answer:
                                    data.id === item.id
                                      ? selectAnswer
                                      : data.answer,
                                  status:
                                    data.id === item.id &&
                                    selectAnswer === item.correct_answer
                                      ? true
                                      : data.status,
                                }))
                              )
                            : null;

                          setSelectAnswer("");
                        }}
                        size="icon"
                        className="rounded-full"
                        variant="outline"
                      >
                        <ArrowLeft size={20} />
                      </Button>
                    ) : null}
                    {currentPage < 10 ? (
                      <Button
                        onClick={() => {
                          setCurrentPage((prev) => prev + 1);
                          setIsNextQuestion(true);

                          selectAnswer !== "" && !isBackToPreviousQuestion
                            ? setAnswer((prev) =>
                                prev.map((data) => ({
                                  ...data,
                                  answer:
                                    data.id === item.id
                                      ? selectAnswer
                                      : data.answer,
                                  status:
                                    data.id === item.id &&
                                    selectAnswer === item.correct_answer
                                      ? true
                                      : data.status,
                                }))
                              )
                            : null;

                          setSelectAnswer("");
                        }}
                        size="icon"
                        className="rounded-full"
                      >
                        <ArrowRight size={20} />
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          setAnswer((prev) =>
                            prev.map((data) => ({
                              ...data,
                              answer:
                                data.id === item.id
                                  ? selectAnswer
                                  : data.id < item.id
                                  ? data.answer
                                  : "",
                            }))
                          );

                          setModalConfirmationSubmit(true);
                        }}
                      >
                        Submit
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="w-full">
                  <Paragraph className="font-bold">
                    {currentPage}. {htmr(item.question)}
                  </Paragraph>
                  <div className="flex justify-center flex-wrap gap-4 items-center mt-4">
                    {answerOptions.map((ans, index) => (
                      <Button
                        key={index + 1}
                        variant={
                          selectAnswer === ans ||
                          (answer[currentPage - 1].answer === ans &&
                            isBackToPreviousQuestion) ||
                          (answer[currentPage - 1].answer === ans &&
                            isNextQuestion)
                            ? "destructive"
                            : "secondary"
                        }
                        onClick={() => {
                          setSelectAnswer(ans);
                          setIsBackToPreviousQuestion(false);
                          setIsNextQuestion(false);
                        }}
                      >
                        {htmr(ans)}
                      </Button>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="text-center justify-center items-center flex">
                  <TotalAnsweredQuestions />
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
}
