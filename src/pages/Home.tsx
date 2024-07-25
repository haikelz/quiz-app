import IsError from "@/components/IsError";
import IsPending from "@/components/IsPending";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Paragraph } from "@/components/ui/typography";
import { useFetch, usePagination, useTitle } from "@/hooks";
import { cn, env } from "@/lib/utils";
import { quizCategoryAtom } from "@/store";
import { QuestionProps } from "@/types";
import htmr from "htmr";
import { atom, useAtom, useAtomValue } from "jotai";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useMemo } from "react";

const { API_URL } = env;

export default function Homepage() {
  const [quizCategory] = useAtom(quizCategoryAtom);

  useTitle("Kerjakan soal kuis");

  const { data, isPending, isError, isRefetching } = useFetch(
    `${API_URL}?amount=10${quizCategory ? `&category=${quizCategory}` : ""}`
  );

  if (isPending || isRefetching) return <IsPending />;
  if (isError) return <IsError />;

  const questions = (data.results as QuestionProps[]).map((item, index) => ({
    ...item,
    id: index + 1,
  }));

  return (
    <>
      <section className="w-full flex flex-col justify-center max-w-3xl min-h-svh items-center">
        <QuestionsList questions={questions} />
        {/*<select value={quizCategory} onChange={onChangeCategory}>
          <option>Select Category</option>
          {quizCategories.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>*/}
      </section>
    </>
  );
}

function QuestionsList({ questions }: { questions: QuestionProps[] }) {
  const initialQuestionsAtom = useMemo(
    () =>
      atom((localStorage.getItem("questions") || questions) as QuestionProps[]),
    [questions]
  );

  const answerAtom = useMemo(
    () =>
      atom(
        (localStorage.getItem("answer") ||
          questions.map((_, index) => ({
            id: index + 1,
            answer: "",
          }))) as { id: number; answer: string }[]
      ),
    [questions]
  );

  const initialQuestions = useAtomValue(initialQuestionsAtom);
  const [answer, setAnswer] = useAtom(answerAtom);

  const { currentData, setCurrentPage, currentPage } =
    usePagination(initialQuestions);

  return (
    <>
      <div className="flex w-full space-x-3 fixed top-4 justify-center items-center">
        {initialQuestions.map((item) => (
          <Button
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
              <Card className="w-full">
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
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                        size="icon"
                        className="rounded-full"
                        variant="outline"
                      >
                        <ArrowLeft size={20} />
                      </Button>
                    ) : null}
                    {currentPage < 10 ? (
                      <Button
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                        size="icon"
                        className="rounded-full"
                      >
                        <ArrowRight size={20} />
                      </Button>
                    ) : null}
                  </div>
                </CardHeader>
                <CardContent className="w-full">
                  <Paragraph className="font-semibold">
                    {currentPage}. {htmr(item.question)}
                  </Paragraph>
                  <div className="flex justify-center flex-wrap gap-4 items-center mt-3">
                    {answerOptions.map((ans) => (
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setAnswer((prev) =>
                            prev.map((data) => ({
                              ...data,
                              answer:
                                data.id === item.id
                                  ? ans
                                  : data.id < item.id
                                  ? data.answer
                                  : "",
                            }))
                          );

                          localStorage.setItem(
                            "answer",
                            JSON.stringify(answer)
                          );
                        }}
                      >
                        {htmr(ans)}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
}
